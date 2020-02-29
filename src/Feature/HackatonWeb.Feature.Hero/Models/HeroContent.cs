﻿using System.Web;

namespace HackatonWeb.Feature.Hero.Models
{
    public class HeroContent
    {
        public HtmlString Title { get; set; }

        public HtmlString SubTitle { get; set; }

        public HtmlString Description { get; set; }

        public HtmlString LinkMoreInformation { get; set; }

        public HtmlString LinkJoin { get; set; }

        public string BackgroundImage { get; set; }

        public string VideoUrl { get; set; }

        public string MainEventDate { get; set; }

        public HtmlString LabelDaysLeft { get; set; }
    }
}