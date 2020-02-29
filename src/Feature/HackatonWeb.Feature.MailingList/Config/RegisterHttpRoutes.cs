using Sitecore.Pipelines;
using System.Web.Http;
using System.Web.Routing;

namespace HackatonWeb.Feature.MailingList.Config
{
    public class RegisterHttpRoutes
    {
        public virtual void Process(PipelineArgs args)
        {
            RouteTable.Routes.MapHttpRoute("CommentApi", "sitecore/api/comments/{id}", new
            {
                controller = "SubscribeManager",
                action = "Get"
            });
        }
    }
}