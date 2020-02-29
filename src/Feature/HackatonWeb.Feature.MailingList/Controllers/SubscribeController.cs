using HackatonWeb.Feature.MailingList.Models;
using HackatonWeb.Foundation.Util;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.MailingList.Controllers
{
    public class SubscribeController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/Subscribe.cshtml", CreateModel());
        }

        private Subscribe CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var mailingList = new Subscribe()
            {
                Title = new HtmlString(FieldRenderer.Render(item, "Title")),
                LabelInputArial = item.Fields["LabelInputArial"].Value,
                LabelInputPlaceHolder = item.Fields["LabelInputPlaceHolder"].Value,
                LabelButtonSubscribe = item.Fields["LabelButtonSubscribe"].Value,
                SubmitUrl = LinkUtil.GetUrlFromLinkField(item.Fields["SubmitUrl"])
            };

            return mailingList;
        }
    }
}