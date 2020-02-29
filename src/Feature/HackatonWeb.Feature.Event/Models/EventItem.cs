using System.Web;

namespace HackatonWeb.Feature.Event.Models
{
    public class EventItem
    {
        public string EventImage { get; set; }

        public HtmlString EventLink { get; set; }

        public HtmlString EventDate { get; set; }

        public HtmlString Description { get; set; }
    }
}