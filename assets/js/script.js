class Pessoa{
    constructor(nome,sobrenome,nacimento,email,contato,telefone,cargo){
        this.nome = nome
        this.sobrenome = sobrenome
        this.nacimento = nacimento
        this.email = email
        this.contato = contato
        this.telefone = telefone
        this.cargo = cargo
    }

        static addStatico(nome,sobrenome,email,cargo){
            let lateral = document.querySelector("#lista-de-alunos")
            let li = document.createElement("li")
            let spanNome = document.createElement("span")
            let spanEmail = document.createElement("span")
            let spanCargo = document.createElement("span")
            spanNome.textContent = `${nome} ${sobrenome}`
            spanEmail.textContent = `${email}`
            spanCargo.textContent = `${cargo}`|| `Aluno`
            li.append(spanNome,spanEmail,spanCargo)
            lateral.append(li)
            atualizaTotal()
        }
    
}

let banco = []

const botaoCadastrar = document.querySelector("#register-button")

    botaoCadastrar.addEventListener("click",(evt)=>{
        CriaCadastro()
        stopDefAction(evt)
    })


function CriaCadastro(){
    let inpNome = document.getElementsByName("nome")[0].value
    let inpSobrenome = document.getElementsByName("sobrenome")[0].value
    let inpDataNascimento = document.getElementsByName("dataNascimento")[0].value
    let inpEmail = document.getElementsByName("email")[0].value
    let inpContato = document.getElementsByName("contato")[0].value
    let inpTelefone = document.getElementsByName("telefone")[0].value
    let inpCargo = document.getElementsByName("cargo")[0].value
    let testando = validaIdadeEmail(inpDataNascimento,inpEmail)
    let Usuario = new Pessoa(inpNome,inpSobrenome,inpDataNascimento,inpEmail,inpContato,inpTelefone,inpCargo)
    if(testando === true){
        banco.push(Usuario)
        Pessoa.addStatico(inpNome,inpSobrenome,inpEmail,inpCargo)
    }
    else{
        aparecerPopUp()
        fecharAuto() 
    }
}

function stopDefAction(evt) {
    evt.preventDefault();
}

const btnPesquisa = document.querySelector("#btn")
btnPesquisa.addEventListener("click",filtro)

function filtro(){
    let lateral = document.querySelector("#lista-de-alunos")
    const tipoFiltro = document.querySelector("#cargoOption").value
    lateral.innerHTML = ""
    if(tipoFiltro == "Todos"){
        banco.forEach(function(usuario){
            Pessoa.addStatico(usuario.nome,usuario.sobrenome,usuario.email,usuario.cargo)
        })
    }
    else{const filtrado = banco.filter(function(b){
        if(b.cargo == tipoFiltro){
            return b
        }
    })
        filtrado.forEach(function(usuario){
            Pessoa.addStatico(usuario.nome,usuario.sobrenome,usuario.email,usuario.cargo)
        })
}
      
}
function validaIdadeEmail(idade,email){
    let data = new Date()
    let anos = data.getFullYear()

    let idadeEmAnos = idade.split("-")[0]
    let testeEmail = banco.find(function(elemento){return elemento.email === email})

    if(anos - idadeEmAnos >= 18 && testeEmail === undefined && email !== ""){
        return true
    }
    else{return false}
}

let PopUp = document.querySelector(".modal-conteiner")

let butPop = document.querySelector(".buttonPop")
butPop.addEventListener("click",fechar)

function aparecerPopUp(){
    PopUp.style.display = "flex"
}
function fechar(){
    PopUp.style.display = "none"
}
function fecharAuto(){
    setTimeout(()=>{
        PopUp.style.display = "none"
    },10000)
}

//UsersPara Teste de Filtro
// let user1 = new Pessoa("João Victor","Lemos","04-08-1999","joao_victorlemos@hotmail.com","31912129231","1158965412","Aluno")
// let user2 = new Pessoa("Zequinha","Francisco","06-09-1998","zequinha@kenzie.com.br","19183211621","19183211621","Facilitador")
// let user3 = new Pessoa("João","Goulart","30-05-2000","joaogl@kenzie.com.br","59874211621","17985181621","Instrutor")
//  banco = [user1,user2,user3]
// filtro()

    let totalAlunos = document.getElementById("total-alunos")

    function atualizaTotal(){
        let teste = document.querySelectorAll("li").length
        totalAlunos.innerText = `${banco.length}`
    }

    atualizaTotal()