using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.SignalR;
using PleasanterBridge.src.APIBridge;
using PleasanterBridge.src.DataRepository.Entity;
using PleasanterBridge.src.DataRepository.Service;
using pleasanterPictures.Models;
using pleasanterPictures.Models.Entity.Picture;
using pleasanterPictures.Models.Entity.Share;
using pleasanterPictures.Models.JsonDataProperty;
using pleasanterPictures.Models.Process.Picture;
using pleasanterPictures.Models.Process.Share;
using pleasanterPictures.Models.Share;
using pleasanterPictures.Models.ViewModel;
using System.Diagnostics;

namespace pleasanterPictures.Controllers
{
    public class PictureController : Controller
    {
        private readonly ViewRenderHelperProcess _viewRenderHelperProcess;
        private readonly IHubContext<MyHub> _hubContext;
        private readonly ILogger<PictureController> _logger;
        private readonly IPleasanterApiBridge _bridge;
        private readonly IPleasanterRepository _pleasanterRepository;
        private long PictureSiteId;
        private long AnswerSiteId;
        private long JoinerSiteId;

        public PictureController(
            ILogger<PictureController> logger,
            IHubContext<MyHub> hubContext,
            IPleasanterApiBridge bridge,
            IPleasanterRepository pleasanterRepository,
            ICompositeViewEngine viewEngine,
            ITempDataProvider tempDataProvider,
            IServiceProvider serviceProvider
        )
        {
            _logger = logger;
            _hubContext = hubContext;
            _bridge = bridge;
            _pleasanterRepository = pleasanterRepository;
            TableIdProperty tableIdProperty = new();
            PictureSiteId = tableIdProperty.PictureSiteId;
            AnswerSiteId = tableIdProperty.AnswerSiteId;
            JoinerSiteId = tableIdProperty.JoinerSiteId;
            _viewRenderHelperProcess = new ViewRenderHelperProcess(viewEngine, tempDataProvider, serviceProvider);
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            SetViewDataProcess setViewDataProcess = new();
            ViewData["UserData"] = setViewDataProcess.SetUserData(HttpContext, _pleasanterRepository);
            base.OnActionExecuting(context);
        }

        [HttpGet]
        public IActionResult Login(long eventId)
        {
            ManageEventId manageEventId = new(HttpContext);
            manageEventId.SetEventId(eventId);

            return RedirectToAction("Index");
        }

        public IActionResult Index()
        {
            GetPictureProcess getPictureProcess = new(HttpContext, _pleasanterRepository, PictureSiteId);
            PictureViewModel pictureViewModel = new PictureViewModel();
            pictureViewModel.setPictureEntityList(getPictureProcess.GetList(PictureSiteId));

            return View(pictureViewModel);
        }

        [HttpGet("Picture/Detail/{resultId}")]
        public IActionResult Detail(long resultId)
        {
            GetPictureProcess getPictureProcess = new(HttpContext, _pleasanterRepository, PictureSiteId);
            PictureViewModel pictureViewModel = new PictureViewModel();
            pictureViewModel.setPictureEntity(getPictureProcess.Get(resultId));

            return View(pictureViewModel);
        }

        public IActionResult PictureList()
        {
            GetPictureProcess getPictureProcess = new(HttpContext, _pleasanterRepository, PictureSiteId);
            PictureViewModel pictureViewModel = new PictureViewModel();
            pictureViewModel.setPictureEntityList(getPictureProcess.GetList(PictureSiteId));

            return View(pictureViewModel);
        }

        [HttpGet("Picture/GetPicture/{pictureId}")]
        public async Task<IActionResult> GetPicture(long pictureId)
        {
            // fixme
            GetPictureProcess getPictureProcess = new(HttpContext, _pleasanterRepository, PictureSiteId);
            PictureViewModel pictureViewModel = new PictureViewModel();
            pictureViewModel.setPictureEntity(getPictureProcess.Get(pictureId));

            var html = await _viewRenderHelperProcess.RenderToStringAsync(this, "_Picture", pictureViewModel);
            return Content(html, "text/html");
        }

        [HttpGet("Picture/Orner/{resultId}")]
        public IActionResult Orner(long resultId)
        {
            GetPictureProcess getPictureProcess = new(HttpContext, _pleasanterRepository, PictureSiteId);
            GetAnswerProcess getAnswerProcess = new(HttpContext, _pleasanterRepository, JoinerSiteId);
            PictureViewModel pictureViewModel = new PictureViewModel();
            pictureViewModel.setPictureEntity(getPictureProcess.Get(resultId));
            pictureViewModel.setAnswerEntityList(getAnswerProcess.GetList(AnswerSiteId, resultId));

            return View(pictureViewModel);
        }

        [HttpGet("Picture/SendPicture/{resultId}")]
        public IActionResult SendPicture(long resultId)
        {
            SendPictureProcess sendPictureProcess = new(_hubContext, _bridge, _pleasanterRepository, PictureSiteId, HttpContext);

            return Json(sendPictureProcess.Send(Convert.ToInt64(resultId)));
        }

        [HttpGet("Picture/ShowPicture/{resultId}")]
        public IActionResult ShowPicture(long resultId)
        {
            GetAnswerProcess getAnswerProcess = new(HttpContext, _pleasanterRepository, JoinerSiteId);
            PictureViewModel pictureViewModel = new PictureViewModel();
            pictureViewModel.setAnswerEntityList(getAnswerProcess.GetList(AnswerSiteId, resultId));

            return View(pictureViewModel);
        }

        [HttpGet("Picture/GetAnswer/{resultId}")]
        public async Task<IActionResult> GetAnswer(long resultId)
        {
            GetAnswerProcess getAnswerProcess = new(HttpContext, _pleasanterRepository, JoinerSiteId);
            PictureViewModel pictureViewModel = new PictureViewModel();
            pictureViewModel.setAnswerEntity(getAnswerProcess.Get(resultId));

            var html = await _viewRenderHelperProcess.RenderToStringAsync(this, "_UserAnswer", pictureViewModel);
            return Content(html, "text/html");
        }

        [HttpPost]
        public async Task<IActionResult> SendAnswer([FromBody] AnswerPostEntity answerPostEntity)
        {
            SendAnswerProcess sendAnswerProcess = new(
                hubContext: _hubContext, 
                bridge: _bridge,
                answerPostEntity: answerPostEntity, 
                answerSiteId: AnswerSiteId, 
                httpContext: HttpContext
            );
            string result = await sendAnswerProcess.Send();

            return Content(result, "application/json");
        }

        [HttpPost]
        public async Task<IActionResult> SendPoints([FromBody] List<PointPostEntity> pointPostEnties)
        {
            SendPointProcess sendAnswerProcess = new(
                hubContext: _hubContext,
                bridge: _bridge,
                pointPostEnties: pointPostEnties, 
                answerSiteId: AnswerSiteId, 
                httpContext: HttpContext
            );
            string result = await sendAnswerProcess.Send();

            return Json(result.ToString());
        }

        [HttpGet("Picture/Image/{resultId}")]
        public IActionResult GetImage(long resultId, [FromQuery] string type = "main")
        {
            try
            {
                GetPictureProcess getPictureProcess = new(HttpContext, _pleasanterRepository, PictureSiteId);
                var imageResult = getPictureProcess.GetImageBytes(resultId, type);

                if (imageResult == null)
                    return NotFound();

                return File(imageResult.Value.bytes, imageResult.Value.contentType, imageResult.Value.fileName);
            }
            catch (FormatException)
            {
                return BadRequest("Invalid image data");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetImage");
                return StatusCode(500, "Error retrieving image");
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}