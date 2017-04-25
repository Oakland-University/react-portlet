/**
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package edu.example.mvc.portlet;

import java.util.Map;

import javax.portlet.PortletRequest;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.bind.annotation.ActionMapping;
import org.springframework.web.portlet.bind.annotation.ResourceMapping;
import org.springframework.web.portlet.bind.annotation.RenderMapping;
import org.springframework.web.portlet.ModelAndView;

/**
 * Main portlet view.
 */
@Controller
@RequestMapping("VIEW")
public class MainController {

    protected final Log logger = LogFactory.getLog(getClass());
    
    @RenderMapping
    public ModelAndView showMainView(final RenderRequest request, final RenderResponse response) {
        return new ModelAndView("main");
    }

    //This is our API endpoint that reactjs will hit
    @ResourceMapping(value="data")
    public ModelAndView getData(ResourceRequest request, ResourceResponse response) {
        ModelAndView mav = new ModelAndView("json");

        //Get the USER_INFO from portlet.xml,
        //which gets it from personDirectoryContext.xml
        @SuppressWarnings("unchecked")
        final Map<String,String> userInfo = (Map<String,String>) request.
                getAttribute(PortletRequest.USER_INFO);
        
        //Can send anything you want back to reactjs
        mav.addObject("displayName", userInfo.get("displayName"));
        mav.addObject("emailAddress", userInfo.get("mail"));
        return mav;
    }

    @ActionMapping
    public void doAction() {
        // no-op action mapping to prevent accidental calls to this URL from
        // crashing the portlet
    }

}
