using HackatonWeb.Feature.Twitter.Models;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.Twitter.Controllers
{
    public class TwitterWidgetController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/TwitterWidget.cshtml", CreateModel());
        }

        private TwitterWidget CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var twitterWidget = new TwitterWidget()
            {
                Title = new HtmlString(FieldRenderer.Render(item, "Title")),
                HashTag = item.Fields["HashTag"].Value
            };

            return twitterWidget;
        }
    }
}