using HackatonWeb.Feature.Event.Models;
using Sitecore.Data.Fields;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.Event.Controllers
{
    public class EventItemController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/EventItem.cshtml", CreateModel());
        }

        private EventItem CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var eventItem = new EventItem()
            {
                EventImage = MediaManager.GetMediaUrl(((ImageField)item.Fields["EventImage"]).MediaItem),
                EventLink = new HtmlString(FieldRenderer.Render(item, "EventLink")),
                EventDate = new HtmlString(FieldRenderer.Render(item, "EventDate")),
                Description = new HtmlString(FieldRenderer.Render(item, "Description"))
            };

            return eventItem;
        }
    }
}