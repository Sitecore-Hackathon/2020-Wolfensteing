using Newtonsoft.Json;
using Sitecore.Services.Infrastructure.Web.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;

namespace HackatonWeb.Feature.MailingList.Controllers
{
    public class SubscribeManagerController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Get(string id)
        {
            var comment = new
            {
                Id = id,
                Name = "Test Person",
                Email = "mailme@testperson.dk",
                Subject = "I have a comment",
                CommentMessage = "This is my comment"
            };
            return new JsonResult<dynamic>(comment, new JsonSerializerSettings(), Encoding.UTF8, this);
        }
    }
}