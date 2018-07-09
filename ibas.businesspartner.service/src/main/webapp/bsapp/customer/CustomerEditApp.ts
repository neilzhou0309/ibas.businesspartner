/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace businesspartner {
    export namespace app {

        /** 编辑应用-客户 */
        export class CustomerEditApp extends ibas.BOEditApplication<ICustomerEditView, bo.Customer> {

            /** 应用标识 */
            static APPLICATION_ID: string = "a2473f05-9f90-4770-9644-a74c0b777fcc";
            /** 应用名称 */
            static APPLICATION_NAME: string = "businesspartner_app_customer_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Customer.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = CustomerEditApp.APPLICATION_ID;
                this.name = CustomerEditApp.APPLICATION_NAME;
                this.boCode = CustomerEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.chooseCustomerGroupEvent = this.chooseCustomerGroup;
                this.view.chooseCustomerContactPersonEvent = this.chooseCustomerContactPerson;
                this.view.chooseCustomerBillAddressEvent = this.chooseCustomerBillAddress;
                this.view.chooseCustomerShipAddressEvent = this.chooseCustomerShipAddress;
                this.view.chooseCustomerPriceListEvent = this.chooseCustomerPriceList;
                this.view.chooseCustomerWarehouseEvent = this.chooseCustomerWarehouse;
                this.view.createAddressEvent = this.createAddress;
                this.view.createContactPersonEvent = this.createContactPerson;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.Customer();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showCustomer(this.editData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Customer): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.Customer)) {
                    let data: bo.Customer = arguments[0];
                    // 新对象直接编辑
                    if (data.isNew) {
                        that.editData = data;
                        that.show();
                        return;
                    }
                    // 尝试重新查询编辑对象
                    let criteria: ibas.ICriteria = data.criteria();
                    if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                        // 有效的查询对象查询
                        let boRepository: bo.BORepositoryBusinessPartner = new bo.BORepositoryBusinessPartner();
                        boRepository.fetchCustomer({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.Customer>): void {
                                let data: bo.Customer;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.Customer)) {
                                    // 查询到了有效数据
                                    that.editData = data;
                                    that.show();
                                } else {
                                    // 数据重新检索无效
                                    that.messages({
                                        type: ibas.emMessageType.WARNING,
                                        message: ibas.i18n.prop("shell_data_deleted_and_created"),
                                        onCompleted(): void {
                                            that.show();
                                        }
                                    });
                                }
                            }
                        });
                        // 开始查询数据
                        return;
                    }
                }
                super.run.apply(this, arguments);
            }
            /** 待编辑的数据 */
            protected editData: bo.Customer;
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryBusinessPartner = new bo.BORepositoryBusinessPartner();
                boRepository.saveCustomer({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Customer>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                // 删除成功，释放当前对象
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                            }
                            // 刷新当前视图
                            that.viewShowed();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            that.editData.delete();
                            that.saveData();
                        }
                    }
                });
            }
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void {
                let that: this = this;
                let createData: Function = function (): void {
                    if (clone) {
                        // 克隆对象
                        that.editData = that.editData.clone();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.Customer();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                        onCompleted(action: ibas.emMessageAction): void {
                            if (action === ibas.emMessageAction.YES) {
                                createData();
                            }
                        }
                    });
                } else {
                    createData();
                }
            }
            private chooseCustomerGroup(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.BusinessPartnerGroup>({
                    boCode: bo.BusinessPartnerGroup.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.BusinessPartnerGroup.PROPERTY_ACTIVATED_NAME,
                            ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES),
                    ],
                    onCompleted(selecteds: ibas.IList<bo.BusinessPartnerGroup>): void {
                        let selected: bo.BusinessPartnerGroup = selecteds.firstOrDefault();
                        that.editData.group = selected.code;
                    }
                });
            }
            private chooseCustomerContactPerson(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.ContactPerson>({
                    boCode: bo.ContactPerson.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.ContactPerson.PROPERTY_ACTIVATED_NAME,
                            ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES),
                        new ibas.Condition(bo.ContactPerson.PROPERTY_OWNERTYPE_NAME,
                            ibas.emConditionOperation.EQUAL, bo.emBusinessPartnerType.CUSTOMER),
                        new ibas.Condition(bo.ContactPerson.PROPERTY_BUSINESSPARTNER_NAME,
                            ibas.emConditionOperation.EQUAL, this.editData.code),
                    ],
                    onCompleted(selecteds: ibas.IList<bo.ContactPerson>): void {
                        let selected: bo.ContactPerson = selecteds.firstOrDefault();
                        that.editData.contactPerson = selected.objectKey;
                        that.editData.telephone1 = selected.telephone1;
                        that.editData.telephone2 = selected.telephone2;
                        that.editData.mobilePhone = selected.mobilePhone;
                        that.editData.faxNumber = selected.fax;
                    }
                });
            }
            private chooseCustomerShipAddress(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Address>({
                    boCode: bo.Address.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.Address.PROPERTY_ACTIVATED_NAME,
                            ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES),
                        new ibas.Condition(bo.Address.PROPERTY_OWNERTYPE_NAME,
                            ibas.emConditionOperation.EQUAL, bo.emBusinessPartnerType.CUSTOMER),
                        new ibas.Condition(bo.Address.PROPERTY_BUSINESSPARTNER_NAME,
                            ibas.emConditionOperation.EQUAL, this.editData.code),
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Address>): void {
                        let selected: bo.Address = selecteds.firstOrDefault();
                        that.editData.shipAddress = selected.objectKey;
                    }
                });
            }
            private chooseCustomerBillAddress(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Address>({
                    boCode: bo.Address.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.Address.PROPERTY_ACTIVATED_NAME,
                            ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES),
                        new ibas.Condition(bo.Address.PROPERTY_OWNERTYPE_NAME,
                            ibas.emConditionOperation.EQUAL, bo.emBusinessPartnerType.CUSTOMER),
                        new ibas.Condition(bo.Address.PROPERTY_BUSINESSPARTNER_NAME,
                            ibas.emConditionOperation.EQUAL, this.editData.code),
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Address>): void {
                        let selected: bo.Address = selecteds.firstOrDefault();
                        that.editData.billAddress = selected.objectKey;
                    }
                });
            }
            private chooseCustomerPriceList(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<materials.bo.IMaterialPriceList>({
                    boCode: materials.bo.BO_CODE_MATERIALPRICELIST,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: materials.app.conditions.materialpricelist.create(),
                    onCompleted(selecteds: ibas.IList<materials.bo.IMaterialPriceList>): void {
                        let selected: materials.bo.IMaterialPriceList = selecteds.firstOrDefault();
                        that.editData.priceList = selected.objectKey;
                        that.editData.currency = selected.currency;
                    }
                });
            }
            private chooseCustomerWarehouse(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<materials.bo.IWarehouse>({
                    boCode: materials.bo.BO_CODE_WAREHOUSE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: materials.app.conditions.warehouse.create(),
                    onCompleted(selecteds: ibas.IList<materials.bo.IWarehouse>): void {
                        let selected: materials.bo.IWarehouse = selecteds.firstOrDefault();
                        that.editData.warehouse = selected.code;
                    }
                });
            }
            private createContactPerson(): void {
                if (this.editData.isNew) {
                    this.messages({
                        title: this.description,
                        type: ibas.emMessageType.WARNING,
                        message: ibas.i18n.prop("shell_data_saved_first"),
                    });
                    return;
                }
                let person: bo.ContactPerson = new bo.ContactPerson();
                person.ownerType = bo.emBusinessPartnerType.CUSTOMER;
                person.businessPartner = this.editData.code;
                let app: ContactPersonEditApp = new ContactPersonEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(person);
            }
            private createAddress(): void {
                if (this.editData.isNew) {
                    this.messages({
                        title: this.description,
                        type: ibas.emMessageType.WARNING,
                        message: ibas.i18n.prop("shell_data_saved_first"),
                    });
                    return;
                }
                let address: bo.Address = new bo.Address();
                address.ownerType = bo.emBusinessPartnerType.CUSTOMER;
                address.businessPartner = this.editData.code;
                let app: AddressEditApp = new AddressEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(address);
            }
        }
        /** 视图-客户 */
        export interface ICustomerEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showCustomer(data: bo.Customer): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择客户组事件 */
            chooseCustomerGroupEvent: Function;
            /** 选择客户联系人事件 */
            chooseCustomerContactPersonEvent: Function;
            /** 选择客户送货地址事件 */
            chooseCustomerShipAddressEvent: Function;
            /** 选择客户账单地址事件 */
            chooseCustomerBillAddressEvent: Function;
            /** 选择客户价格清单事件 */
            chooseCustomerPriceListEvent: Function;
            /** 选择客户仓库事件 */
            chooseCustomerWarehouseEvent: Function;
            /** 创建联系人 */
            createContactPersonEvent: Function;
            /** 创建地址 */
            createAddressEvent: Function;
        }
    }
}