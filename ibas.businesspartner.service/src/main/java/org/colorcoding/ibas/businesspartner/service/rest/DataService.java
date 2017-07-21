package org.colorcoding.ibas.businesspartner.service.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.businesspartner.repository.*;
import org.colorcoding.ibas.businesspartner.bo.businesspartnergroup.*;
import org.colorcoding.ibas.businesspartner.bo.contactperson.*;
import org.colorcoding.ibas.businesspartner.bo.customer.*;
import org.colorcoding.ibas.businesspartner.bo.supplier.*;

/**
* BusinessPartner 数据服务JSON
*/
@Path("data")
public class DataService extends BORepositoryBusinessPartner {

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-业务伙伴组
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchBusinessPartnerGroup")
    public OperationResult<BusinessPartnerGroup> fetchBusinessPartnerGroup(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchBusinessPartnerGroup(criteria, token);
    }

    /**
     * 保存-业务伙伴组
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveBusinessPartnerGroup")
    public OperationResult<BusinessPartnerGroup> saveBusinessPartnerGroup(BusinessPartnerGroup bo, @QueryParam("token") String token) {
        return super.saveBusinessPartnerGroup(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-业务伙伴联系人
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchContactPerson")
    public OperationResult<ContactPerson> fetchContactPerson(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchContactPerson(criteria, token);
    }

    /**
     * 保存-业务伙伴联系人
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveContactPerson")
    public OperationResult<ContactPerson> saveContactPerson(ContactPerson bo, @QueryParam("token") String token) {
        return super.saveContactPerson(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-业务伙伴-客户
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchCustomer")
    public OperationResult<Customer> fetchCustomer(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchCustomer(criteria, token);
    }

    /**
     * 保存-业务伙伴-客户
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveCustomer")
    public OperationResult<Customer> saveCustomer(Customer bo, @QueryParam("token") String token) {
        return super.saveCustomer(bo, token);
    }

    //--------------------------------------------------------------------------------------------//
    /**
     * 查询-业务伙伴-供应商
     * @param criteria 查询
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("fetchSupplier")
    public OperationResult<Supplier> fetchSupplier(Criteria criteria, @QueryParam("token") String token) {
        return super.fetchSupplier(criteria, token);
    }

    /**
     * 保存-业务伙伴-供应商
     * @param bo 对象实例
     * @param token 口令
     * @return 操作结果
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("saveSupplier")
    public OperationResult<Supplier> saveSupplier(Supplier bo, @QueryParam("token") String token) {
        return super.saveSupplier(bo, token);
    }

    //--------------------------------------------------------------------------------------------//

}
