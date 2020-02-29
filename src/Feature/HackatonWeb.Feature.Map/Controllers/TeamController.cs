﻿using HackatonWeb.Feature.Map.Models;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.Map.Controllers
{
    public class TeamController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/Team.cshtml", CreateModel());
        }

        private Team CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var team = new Team()
            {
                HashTag = item.Fields["HashTag"].Value
            };

            return team;
        }
    }
}