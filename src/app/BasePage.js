import React, {Suspense} from "react";
import {Redirect, Switch} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {MyPage} from "./pages/MyPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Business from "./pages/Business/Business";
import AddBusiness from "./pages/Business/AddBusiness";
import Subscribers from "./pages/Subscribers/Subscribers";
import Broadcasts from "./pages/Campaigns/Broadcasts";
import AddBroadcast from "./pages/Campaigns/AddBroadcast";
import EditBroadcast from "./pages/Campaigns/EditBroadcast";
import {CreateBroadcast} from "./pages/Campaigns/CreateBroadcast";
import {SelectEditor} from "./pages/Campaigns/SelectEditor";
import Builder from "./pages/Campaigns/Builder";
import EditBuilder from "./pages/Campaigns/EditBuilder";
import {Template} from "./pages/Campaigns/Template";
import {MyTemplates} from "./pages/Campaigns/MyTemplates";
import {TemplateView} from "./pages/Campaigns/TemplateView";
import Schedule from "./pages/Campaigns/Schedule";
import CreateSchedule from "./pages/Campaigns/CreateSchedule";
import Statistics from "./pages/Campaigns/Statistics";
import {ViewStatistics} from "./pages/Campaigns/ViewStatistics";
import {Analytics} from "./pages/Analytics/Analytics";
import {GenerateQR} from "./pages/Links/GenerateQR";
import AddBranch from "./pages/Links/AddBranch";
import AddOffers from "./pages/Links/AddOffers";
import Branches from "./pages/Business/Branches";
import AddBusinessBranch from "./pages/Business/AddBusinessBranch";
import {EditBusinessBranch} from "./pages/Business/EditBusinessBranch";
import {BusinessVerify} from "./pages/Business/BusinessVerify";
import ViewBusiness from "./pages/Business/ViewBusiness";
import SaveBusiness from "./pages/Business/SaveBusiness";
import BranchSubscribers from "./pages/Business/BranchSubscribers";
import ViewBranch from "./pages/Business/ViewBranch";
import Offers from "./pages/Offers/Offers";
import AddOffer from "./pages/Offers/AddOffer";
import Profile from "./pages/Dashboard/Profile";
import ResetPass from "./pages/Dashboard/ResetPass";
import FileManager from "./pages/Campaigns/FileManager";

export default function BasePage() {

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={DashboardPage}/>
                <ContentRoute path="/business/all" component={Business}/>
                <ContentRoute path="/business/add" component={AddBusiness}/>
                <ContentRoute path="/business/branches" component={Branches}/>
                <ContentRoute path="/business/branch/add" component={AddBusinessBranch}/>
                <ContentRoute path="/business/branch/edit" component={EditBusinessBranch}/>
                <ContentRoute path="/business/branch/view" component={ViewBranch}/>
                <ContentRoute path="/business/branch/subscriber" component={BranchSubscribers}/>
                <ContentRoute path="/business/verify" component={BusinessVerify}/>
                <ContentRoute path="/business/view" component={ViewBusiness}/>
                <ContentRoute path="/business/save" component={SaveBusiness}/>
                <ContentRoute path="/subscribers" component={Subscribers}/>
                <ContentRoute path="/campaigns/all" component={Broadcasts}/>
                <ContentRoute path="/campaigns/html" component={AddBroadcast}/>
                <ContentRoute path="/campaigns/edit/html" component={EditBroadcast}/>
                <ContentRoute path="/campaigns/new" component={CreateBroadcast}/>
                <ContentRoute path="/campaigns/editor" component={SelectEditor}/>
                <ContentRoute path="/campaigns/builder" component={Builder}/>
                <ContentRoute path="/campaigns/edit/builder" component={EditBuilder}/>
                <ContentRoute path="/campaigns/templates" component={Template}/>
                <ContentRoute path="/campaigns/template/view" component={TemplateView}/>
                <ContentRoute path="/campaigns/my-templates" component={MyTemplates}/>
                <ContentRoute path="/campaigns/schedule/all" component={Schedule}/>
                <ContentRoute path="/campaigns/schedule/new" component={CreateSchedule}/>
                <ContentRoute path="/campaigns/statistics" component={Statistics}/>
                <ContentRoute path="/campaigns/statistic/detail" component={ViewStatistics}/>
                <ContentRoute path="/analytics" component={Analytics}/>
                <ContentRoute path="/links/qrcode" component={GenerateQR}/>
                <ContentRoute path="/links/branch/add" component={AddBranch}/>
                <ContentRoute path="/links/offers/add" component={AddOffers}/>
                <ContentRoute path="/business/branch/offers" component={Offers}/>
                <ContentRoute path="/business/branch/offer/add" component={AddOffer}/>
                <ContentRoute path="/profile" component={Profile}/>
                <ContentRoute path="/reset-password" component={ResetPass}/>
                <ContentRoute path="/file-manager" component={FileManager}/>
                <ContentRoute path="/my-page" component={MyPage}/>
                <Redirect from="/business" exact={true} to="/business/all"/>
                <Redirect from="/campaigns" exact={true} to="/campaigns/all"/>
                <Redirect from="/links" exact={true} to="/links/branch/add"/>
                <Redirect to="error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
