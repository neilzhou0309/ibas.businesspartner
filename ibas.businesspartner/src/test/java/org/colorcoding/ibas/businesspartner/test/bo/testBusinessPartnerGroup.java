package org.colorcoding.ibas.businesspartner.test.bo;

import junit.framework.TestCase;
import org.colorcoding.ibas.bobas.data.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.bobas.repository.*;
import org.colorcoding.ibas.businesspartner.data.*;
import org.colorcoding.ibas.businesspartner.bo.businesspartnergroup.*;
import org.colorcoding.ibas.businesspartner.repository.*;

/**
* 业务伙伴组 测试
* 
*/
public class testBusinessPartnerGroup extends TestCase {
    /**
     * 获取连接口令
    */
    String getToken() {
        return "";
    }
    
    /**
     * 基本项目测试
     * @throws Exception 
    */
    public void testBasicItems() throws Exception {
        BusinessPartnerGroup bo = new BusinessPartnerGroup();
        // 测试属性赋值


        // 测试对象的保存和查询
        IOperationResult<?> operationResult = null;
        ICriteria criteria = null;
        IBORepositoryBusinessPartnerApp boRepository = new BORepositoryBusinessPartner();
        //设置用户口令
        boRepository.setUserToken(this.getToken());

        // 测试保存
        operationResult = boRepository.saveBusinessPartnerGroup(bo);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
        BusinessPartnerGroup boSaved = (BusinessPartnerGroup)operationResult.getResultObjects().firstOrDefault();


        // 测试查询
        criteria = boSaved.getCriteria();
        criteria.setResultCount(10);
        operationResult = boRepository.fetchBusinessPartnerGroup(criteria);
        assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);


    }

}
