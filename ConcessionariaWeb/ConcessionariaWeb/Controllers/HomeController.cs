using ConcessionariaWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net.Http;
using System;
using ConcessionariaWeb.Data;

namespace ConcessionariaWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ConcessionariaContext _context;

        public HomeController(ILogger<HomeController> logger, ConcessionariaContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AdicionarVeiculo()
        {
            return View();
        }

        public IActionResult DetalhesVeiculo(int id)
        {
            var veiculo = _context.Veiculos.SingleOrDefault(v => v.Id == id);

            if(veiculo == null)
            {
                return NotFound();
            }
            return View(veiculo);

        }

        public IActionResult EditarVeiculo(int id)
        {
            var veiculo = _context.Veiculos.SingleOrDefault(v => v.Id == id);

            if(veiculo == null)
            {
                return NotFound();
            }

            return View(veiculo);
        }

        

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}