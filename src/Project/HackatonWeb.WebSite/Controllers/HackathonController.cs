using HackatonWeb.WebSite.Models.Pages;
using Sitecore.Data.Fields;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.WebSite.Controllers
{
    public class HackathonController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
            var page = PageContext.Current.Item;
            var model = new HackathonModel
            {
                Title = page.Fields["Title"].Value,
                Description = new HtmlString(FieldRenderer.Render(page, "Description")),
                SubmissionTitle = page.Fields["Submission Title"].Value,
                SubmissionInformation = new HtmlString(FieldRenderer.Render(page, "Submission Information")),
                JudgesTitle = page.Fields["Judges Title"].Value,
                PrizesTitle = page.Fields["Prizes Title"].Value,
                PrizesDetail = new HtmlString(FieldRenderer.Render(page, "Prizes Detail")),
                FAQsTitle = page.Fields["FAQs Title"].Value
            };

            MultilistField judgesListInfo = page.Fields["Judges List"];
            
            foreach (var judge in judgesListInfo.GetItems())
            {
                LinkField twitterLink = judge.Fields["Twitter Profile Link"];
                LinkField LinkedInLink = judge.Fields["LinkedIn Profile Link"];

                model.Judges.Add(new Judge
                {
                    Name = judge.Fields["Name"].Value,
                    TwitterLink = twitterLink.Url,
                    LinkedInLink = LinkedInLink.Url,
                    Picture = new HtmlString(FieldRenderer.Render(judge, "Picture")),
                    LinkedInPicture = new HtmlString(FieldRenderer.Render(judge, "LinkedIn Image")),
                    TwitterPicture = new HtmlString(FieldRenderer.Render(judge, "Twitter Image")),
                });
            }

            MultilistField faqsListInfo = page.Fields["FAQs List"];

            foreach (var faq in faqsListInfo.GetItems())
            {
                model.FAQs.Add(new Faq
                {
                    Question = faq.Fields["Question"].Value,
                    Answer = faq.Fields["Answer"].Value
                });
            }

            return View("~/Views/Content/Pages/Hackathon.cshtml", model);
        }
    }
}