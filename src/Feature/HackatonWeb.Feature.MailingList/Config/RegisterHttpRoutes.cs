using Sitecore.Pipelines;
using System.Web.Http;
using System.Web.Routing;

namespace HackatonWeb.Feature.MailingList.Config
{
    public class RegisterHttpRoutes
    {
        public virtual void Process(PipelineArgs args)
        {
            RouteTable.Routes.MapHttpRoute("SubscribeApi", "api/v1/subscribe/{email}",
                new { controller = "SubscribeManager", action = "Get" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
        }
    }
}