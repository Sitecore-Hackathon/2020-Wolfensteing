using System.Collections.Generic;
using System.Web;

namespace HackatonWeb.WebSite.Models.Pages
{
    public class HackathonModel 
    {
        public string Title { get; set; }
        public HtmlString Description { get; set; }

        public string SubmissionTitle { get; set; }
        public HtmlString SubmissionInformation { get; set; }

        public string JudgesTitle { get; set; }
        public List<Judge> Judges { get; set; }

        public string PrizesTitle { get; set; }
        public HtmlString PrizesDetail { get; set; }

        public string FAQsTitle { get; set; }

        public List<Faq> FAQs { get; set; }

        public HackathonModel()
        {
            Judges = new List<Judge>();
            FAQs = new List<Faq>();
        }

    }

    public class Judge
    {
        public string Name { get; set; }

        public string TwitterLink { get; set; }

        public string LinkedInLink { get; set; }

        public HtmlString Picture { get; set; }

        public HtmlString LinkedInPicture { get; set; }

        public HtmlString TwitterPicture { get; set; }
    }

    public class Faq
    {
        public string Question { get; set; }

        public string Answer { get; set; }
    }
}