using ConcessionariaWeb.Data;
using ConcessionariaWeb.Models;
using Microsoft.AspNetCore.Mvc;

namespace ConcessionariaWeb.Controllers
{
    [Route("api/concessionariaweb")]
    [ApiController]
    public class ConcessionariaController : ControllerBase
    {
        private readonly ConcessionariaContext _context;

        public ConcessionariaController(ConcessionariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var veiculos = _context.Veiculos.Where(v => !v.Vendido).ToList();

            return Ok(veiculos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var veiculo = _context.Veiculos.SingleOrDefault(v => v.Id == id);

            if (veiculo == null)
            {
                return NotFound();
            }

            return Ok(veiculo);
        }

        [HttpPost]
        public IActionResult Post(Veiculo veiculo)
        {
            _context.Veiculos.Add(veiculo);

            return CreatedAtAction(nameof(GetById), new { id = veiculo.Id }, veiculo);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Veiculo veiculoEditado)
        {
            var veiculo = _context.Veiculos.SingleOrDefault(v => v.Id == id);

            if (veiculo == null)
            {
                return NotFound();
            }

            veiculo.Update(veiculoEditado.Modelo, veiculoEditado.Marca, veiculoEditado.Versao, veiculoEditado.Ano, veiculoEditado.Quilometragem, veiculoEditado.Valor);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var veiculo = _context.Veiculos.SingleOrDefault(v => v.Id == id);

            if (veiculo == null)
            {
                return NotFound();
            }

            veiculo.Vender();

            return NoContent();
        }
    }
}
