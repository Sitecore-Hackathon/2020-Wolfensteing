using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.MailingList.Controllers
{
    public class MailingListController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/MailingList.cshtml", CreateModel());
        }

        private Models.MailingList CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var mailingList = new Models.MailingList()
            {
                Title = new HtmlString(FieldRenderer.Render(item, "Title")),
                LabelInputArial = new HtmlString(FieldRenderer.Render(item, "LabelInputArial")),
                LabelInputPlaceHolder = new HtmlString(FieldRenderer.Render(item, "LabelInputPlaceHolder")),
                LabelButtonSubscribe = new HtmlString(FieldRenderer.Render(item, "LabelButtonSubscribe"))
            };

            return mailingList;
        }
    }
}