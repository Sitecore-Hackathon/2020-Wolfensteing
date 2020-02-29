using System.Web;

namespace HackatonWeb.Feature.MailingList.Models
{
    public class MailingList
    {
        public HtmlString Title { get; set; }

        public HtmlString LabelInputArial { get; set; }

        public HtmlString LabelInputPlaceHolder { get; set; }

        public HtmlString LabelButtonSubscribe { get; set; }
    }
}