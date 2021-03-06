/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace businesspartner {
    export namespace ui {
        export namespace c {
            /**
             * 编辑视图-客户
             */
            export class CustomerEditView extends ibas.BOEditView implements app.ICustomerEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /*** 选择客户组事件*/
                chooseCustomerGroupEvent: Function;
                /** 选择客户联系人事件 */
                chooseCustomerContactPersonEvent: Function;
                /** 选择客户送货地址事件 */
                chooseCustomerShipAddressEvent: Function;
                /** 选择客户账单地址事件 */
                chooseCustomerBillAddressEvent: Function;
                /** 选择客户注册地址事件 */
                chooseCustomerRegistrationAddress: Function;
                /** 选择客户价格清单事件 */
                chooseCustomerPriceListEvent: Function;
                /** 选择客户底价清单事件 */
                chooseCustomerFloorListEvent: Function;
                /** 选择客户仓库事件 */
                chooseCustomerWarehouseEvent: Function;
                /** 创建联系人 */
                createContactPersonEvent: Function;
                /** 创建地址 */
                createAddressEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("businesspartner_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_code") }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("bindingValue", {
                                path: "code",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                })
                            }).bindProperty("editable", {
                                path: "series",
                                formatter(data: any): any {
                                    return data > 0 ? false : true;
                                }
                            }),
                            new sap.extension.m.SeriesSelect("", {
                                objectCode: bo.BO_CODE_CUSTOMER,
                            }).bindProperty("bindingValue", {
                                path: "series",
                                type: new sap.extension.data.Numeric()
                            }).bindProperty("enabled", {
                                path: "isNew",
                                formatter(data: any): any {
                                    return !!data ? true : false;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_sign") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "sign",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_group") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryBusinessPartner,
                                dataInfo: {
                                    type: bo.BusinessPartnerGroup,
                                    key: bo.BusinessPartnerGroup.PROPERTY_CODE_NAME,
                                    text: bo.BusinessPartnerGroup.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerGroupEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "group",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_companyprivate") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: bo.emBusinessPartnerNature
                            }).bindProperty("bindingValue", {
                                path: "companyPrivate",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emBusinessPartnerNature
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_pricelist") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: materials.bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: materials.bo.MaterialPriceList,
                                    key: materials.bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME,
                                    text: materials.bo.MaterialPriceList.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerPriceListEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "priceList",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_warehouse") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: materials.bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: materials.bo.Warehouse,
                                    key: materials.bo.Warehouse.PROPERTY_CODE_NAME,
                                    text: materials.bo.Warehouse.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerWarehouseEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "warehouse",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_currency") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "currency",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 5
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_taxgroup") }),
                            new sap.extension.m.SelectionInput("", {
                                showValueHelp: true,
                                repository: accounting.bo.BORepositoryAccounting,
                                dataInfo: {
                                    type: accounting.bo.TaxGroup,
                                    key: accounting.bo.TaxGroup.PROPERTY_CODE_NAME,
                                    text: accounting.bo.TaxGroup.PROPERTY_NAME_NAME,
                                },
                                criteria: [
                                    new ibas.Condition(accounting.bo.TaxGroup.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES),
                                    new ibas.Condition(accounting.bo.TaxGroup.PROPERTY_CATEGORY_NAME, ibas.emConditionOperation.EQUAL, accounting.bo.emTaxGroupCategory.OUTPUT)

                                ]
                            }).bindProperty("bindingValue", {
                                path: "taxGroup",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_validdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "validDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_invaliddate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "invalidDate",
                                type: new sap.extension.data.Date()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_floorlist") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: materials.bo.BORepositoryMaterials,
                                dataInfo: {
                                    type: materials.bo.MaterialPriceList,
                                    key: materials.bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME,
                                    text: materials.bo.MaterialPriceList.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerFloorListEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "floorList",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("businesspartner_title_contact") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_contactperson") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryBusinessPartner,
                                dataInfo: {
                                    type: bo.ContactPerson,
                                    key: bo.ContactPerson.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.ContactPerson.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerContactPersonEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "contactPerson",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_billaddress") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryBusinessPartner,
                                dataInfo: {
                                    type: bo.Address,
                                    key: bo.Address.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.Address.PROPERTY_NAME_NAME,
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerBillAddressEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "billAddress",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_shipaddress") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryBusinessPartner,
                                dataInfo: {
                                    type: bo.Address,
                                    key: bo.Address.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.Address.PROPERTY_NAME_NAME,
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerShipAddressEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "shipAddress",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_registrationaddress") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryBusinessPartner,
                                dataInfo: {
                                    type: bo.Address,
                                    key: bo.Address.PROPERTY_OBJECTKEY_NAME,
                                    text: bo.Address.PROPERTY_NAME_NAME,
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseCustomerRegistrationAddress);
                                },
                            }).bindProperty("bindingValue", {
                                path: "registrationAddress",
                                type: new sap.extension.data.Numeric(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_telephone1") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "telephone1",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_telephone2") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "telephone2",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_mobilephone") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "mobilePhone",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 50
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_faxnumber") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "faxNumber",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_channel") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "channel",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_organizationalunit") }),
                            new sap.extension.m.OrganizationInput("", {
                                showValueHelp: true,
                                chooseType: ibas.emChooseType.SINGLE,
                            }).bindProperty("bindingValue", {
                                path: "organizationalUnit",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("businesspartner_title_invoices") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_taxid") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "taxId",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_bank") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "bank",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_bankaccount") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "bankAccount",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_invoiceaddress") }),
                            new sap.extension.m.Input("", {
                                showValueHelp: true,
                                valueHelpOnly: false,
                                valueHelpRequest: function (event: sap.ui.base.Event): void {
                                    let source: sap.extension.m.Input = <sap.extension.m.Input>event.getSource();
                                    if (source instanceof sap.extension.m.Input) {
                                        let popover: sap.m.Popover = new sap.m.Popover("", {
                                            showHeader: false,
                                            placement: sap.m.PlacementType.Right,
                                            enableScrolling: false,
                                            horizontalScrolling: false,
                                            contentWidth: "auto",
                                            contentHeight: "auto",
                                            content: [
                                                new sap.ui.layout.form.SimpleForm("", {
                                                    content: [
                                                        new sap.extension.m.AddressArea("", {
                                                            countryVisible: false,
                                                            zipCodeVisible: false,
                                                            addressChange: function (event: sap.ui.base.Event): void {
                                                                source.setBindingValue(event.getParameter("address"));
                                                            }
                                                        }),
                                                    ]
                                                })
                                            ]
                                        });
                                        popover.addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                        popover.openBy(event.getSource(), true);
                                    }
                                },
                            }).bindProperty("bindingValue", {
                                path: "invoiceAddress",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 200
                                }),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_customer_invoicetelephone") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "invoiceTelephone",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 20
                                }),
                            }),
                            new sap.ui.core.Title("", {}),
                        ],
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.Customer.BUSINESS_OBJECT_CODE,
                        },
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("shell_data_new") + ibas.i18n.prop("businesspartner_title_contact"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add-coursebook",
                                    buttonMode: sap.m.MenuButtonMode.Regular,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("bo_address"),
                                                icon: "sap-icon://contacts",
                                                press: function (event: any): void {
                                                    that.fireViewEvents(that.createAddressEvent, true);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("bo_contactperson"),
                                                icon: "sap-icon://customer-briefing",
                                                press: function (event: any): void {
                                                    that.fireViewEvents(that.createContactPersonEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                /** 显示数据 */
                showCustomer(data: bo.Customer): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
            }
        }
    }
}