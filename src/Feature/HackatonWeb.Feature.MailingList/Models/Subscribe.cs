using System.Web;

namespace HackatonWeb.Feature.MailingList.Models
{
    public class Subscribe
    {
        public HtmlString Title { get; set; }

        public string LabelInputArial { get; set; }

        public string LabelInputPlaceHolder { get; set; }

        public string LabelButtonSubscribe { get; set; }

        public string SubmitUrl { get; set; }
    }
}