$(document).ready(function () {
    // Carregar a lista de carros na inicialização

    carregarListaDeVeiculos();


    // Função para carregar a lista de carros
    function carregarListaDeVeiculos() {
        $.ajax({
            url: "/api/concessionariaweb",
            type: "GET",
            success: function (data) {
                exibirVeiculos(data);
            },
            error: function (error) {
                console.error("Erro ao obter a lista de veículos:", error);
            }
        });
    }

    // Função para exibir os veículos na página inicial
    function exibirVeiculos(veiculos) {
        const listaVeiculo = $("#vehicle-list");
        listaVeiculo.empty();

        const row = $("<div class='row'></div>");
        listaVeiculo.append(row);

        $.each(veiculos, function (index, veiculo) {
            const blocoVeiculo = $("<div class='col-md-6 col-lg-4 col-mb-12 vehicle-block'>");
            const nomeVeiculo = $("<div class='vehicle-name'>")
            const infoVeiculo = $("<div class='vehicle-info'>");
            const acoesVeiculo = $("<div class='vehicle-actions'>");

            nomeVeiculo.append("<h3>" + veiculo.modelo + " " + veiculo.marca + "</h3>");
            infoVeiculo.append("<p>Versão: " + veiculo.versao + "</p>");
            infoVeiculo.append("<p>Ano: " + veiculo.ano + "</p>");
            infoVeiculo.append("<p>Quilometragem: " + veiculo.quilometragem + " km</p>");
            infoVeiculo.append("<p>Valor: R$" + veiculo.valor.toFixed(2) + "</p>");

            acoesVeiculo.append("<button class='btn-details' data-id='" + veiculo.id + "'>Detalhes</button>");
            acoesVeiculo.append("<button class='btn-edit' data-id='" + veiculo.id + "'>Editar</button>");
            acoesVeiculo.append("<button class='btn-sell' data-id='" + veiculo.id + "'>Vender</button>");

            blocoVeiculo.append(nomeVeiculo);
            blocoVeiculo.append(infoVeiculo);
            blocoVeiculo.append(acoesVeiculo);
            row.append(blocoVeiculo);
        });

        // Adicionar evento de clique aos botões "Detalhes"
        $(".btn-details").click(function () {
            const veiculoId = $(this).data("id");
            exibirPaginaDetalhes(veiculoId);
        });

        $(".btn-sell").click(function () {
            const veiculoId = $(this).data("id");
            venderVeiculo(veiculoId);
        });

        $(".btn-edit").click(function () {
            const veiculoId = $(this).data("id");
            exibirFormularioEdicao(veiculoId);
        })
    }

    

    function exibirPaginaDetalhes(veiculoId) {
        // Obter detalhes do veículo pelo ID usando a API
        $.ajax({
            url: "/api/concessionariaweb/" + veiculoId,
            type: "GET",
            success: function (data) {
                // Construir a URL com os parâmetros de consulta
                const detalhesVeiculoUrl = "/Home/DetalhesVeiculo?" + $.param(data);
                
                // Navegar para a view DetalhesVeiculo
                window.location.href = detalhesVeiculoUrl;
            },
            error: function (error) {
                console.error("Erro ao obter detalhes do veículo:", error);
            }
        });
    }

    function venderVeiculo(veiculoId) {
        $.ajax({
            url: "api/concessionariaweb/" + veiculoId,
            type: "DELETE",
            success: function () {
                carregarListaDeVeiculos();
                alert("Veículo vendido com sucesso!");

            },
            error: function () {
                console.error("Erro ao vender o veiculo: ", error);
            }
        });
    }

    // Adicionar evento de clique ao botão "Adicionar Novo Veículo"
    $("#btn-add-vehicle").click(function () {
        exibirFormularioAdicao();
    });

    

    // Função para exibir formulário de adição de veículo
    function exibirFormularioAdicao() {
        window.location.href = "/Home/AdicionarVeiculo";
    }

    // Adicionar evento de envio do formulário de adição do veículo
    $(document).on("submit", "#form-add-vehicle", function (e) {
        e.preventDefault();
        adicionarNovoVeiculo();
    });

    // Função para adicionar um novo veículo
    function adicionarNovoVeiculo() {
        // Obter dados do formulário
        const modelo = $("#modelo").val();
        const marca = $("#marca").val();
        const versao = $("#versao").val();
        const ano = $("#ano").val();
        const quilometragem = $("#quilometragem").val();
        const valor = $("#valor").val();

        const novoVeiculo = {
            modelo: modelo,
            marca: marca,
            versao: versao,
            ano: parseInt(ano),
            quilometragem: parseInt(quilometragem),
            valor: parseFloat(valor),
            vendido: false
        };

        // Enviar dados para a API (POST)
        $.ajax({
            url: "/api/concessionariaweb",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(novoVeiculo),
            success: function (data) {
                alert("Veículo adicionado com sucesso!");
                // Redirecionar para a página inicial após a adição do novo veículo
                window.location.href = "/";
            },
            error: function (error) {
                console.error("Erro ao adicionar o veículo:", error);
            }
        });
    }

    function exibirFormularioEdicao(veiculoId) {
        $.ajax({
            url: "/api/concessionariaweb/" + veiculoId,
            type: "GET",
            success: function (data) {
                // Construir a URL com os parâmetros de consulta
                const editarVeiculoUrl = "/Home/EditarVeiculo?" + $.param(data);

                // Navegar para a view DetalhesVeiculo
                window.location.href = editarVeiculoUrl;
            },
            error: function (error) {
                console.error("Erro ao obter detalhes do veículo:", error);
            }
        });
    }

    

    $(document).on("submit", "#form-edit-vehicle", function (e) {
        e.preventDefault();
        editarVeiculo();
    });

    function editarVeiculo() {

        // Obter dados do formulário
        const veiculoId = $("#veiculo-id").val();
        const modelo = $("#modelo").val();
        const marca = $("#marca").val();
        const versao = $("#versao").val();
        const ano = $("#ano").val();
        const quilometragem = $("#quilometragem").val();
        const valor = $("#valor").val();
        

        const veiculoEditado = {
            Id: veiculoId,
            Modelo: modelo,
            Marca: marca,
            Versao: versao,
            Ano: parseInt(ano),
            Quilometragem: parseInt(quilometragem),
            Valor: parseFloat(valor)
            
        };

        // Enviar novos dados do veículo para a API (PUT)
        $.ajax({
            url: "/api/concessionariaweb/" + veiculoId,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(veiculoEditado),
            success: function (data) {
                carregarListaDeVeiculos();
                alert("Veículo editado com sucesso!");
                // Redirecionar de volta à página inicial após a edição
                window.location.href = "/";

            },
            error: function (error) {
                console.error("Erro ao editar o veículo:", error);
            }
        });
    }
    
});
