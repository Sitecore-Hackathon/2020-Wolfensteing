﻿using System.Web;

namespace HackatonWeb.Feature.Hero.Models
{
    public class HeroContent
    {    
        public HtmlString Title { get; set; }

        public HtmlString SubTitle { get; set; }

        public HtmlString Description { get; set; }

        public HtmlString LabelMoreInformation { get; set; }
               
        public HtmlString LabelJoin { get; set; }
        
        public HtmlString LinkMoreInformation { get; set; }

        public HtmlString LinkJoin { get; set; }

        public HtmlString BackgroundImage { get; set; }

        public HtmlString VideoUrl { get; set; }
    }
}