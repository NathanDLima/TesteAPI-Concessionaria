namespace ConcessionariaWeb.Models
{
    public class Veiculo
    {

        private static int proximoId = 1;

        public Veiculo()
        {
            Id = proximoId++;
            Vendido = false;
        }

        public int Id { get; set; }

        public string Modelo { get; set; }

        public string Marca { get; set; }

        public string Versao { get; set; }

        public int Ano { get; set; }

        public int Quilometragem { get; set; }

        public decimal Valor { get; set; }

        public bool Vendido { get; set; }

        public void Update(string modelo, string marca, string versao, int ano, int quilometros, decimal valor)
        {
            Modelo = modelo;
            Marca = marca;
            Versao = versao;
            Ano = ano;
            Quilometragem = quilometros;
            Valor = valor;
        }

        public void Vender()
        {
            Vendido = true;
        }
    }
}
