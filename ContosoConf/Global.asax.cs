using ContosoConf.App_Start;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ContosoConf
{
    public class Global : HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}