using ConcessionariaWeb.Models;

namespace ConcessionariaWeb.Data
{
    public class ConcessionariaContext
    {

        public List<Veiculo> Veiculos { get; set; }

        public ConcessionariaContext()
        {
            Veiculos = new List<Veiculo>();
        }


    }
}
