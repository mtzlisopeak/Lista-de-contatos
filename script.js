let form = document.querySelector("form")
let botao = document.querySelector("button")
let avisoTxt = document.querySelector("#aviso")
let nomeContatoInput = document.querySelector("#nome-contato")
let numeroContatoInput = document.querySelector("#numero-contato")
let quantidadeContatosLabel = document.querySelector("#quantidade")
let containerContatos = document.querySelector("#container-contatos")
let quantidadeContatos = 0
let listaContatos = []

form.addEventListener("submit", (e) => {
  e.preventDefault()
})

numeroContatoInput.addEventListener("input", () => {
  let formatarNumero = (valor) => {
    let limparValor = valor.replace(/\D/g, "").substring(0, 11)
    let partes = []

    if (limparValor.length > 0) partes.push(`(${limparValor.slice(0, 2)})`)
    if (limparValor.length > 2) partes.push(` ${limparValor.slice(2, 7)}`)
    if (limparValor.length > 7) partes.push(`-${limparValor.slice(7)}`)

    return partes.join('')
  }

  numeroContatoInput.value = formatarNumero(numeroContatoInput.value);
})

if (botao){
  botao.addEventListener("click", ()=> {
    let nome = document.querySelector("#nome-contato").value.trim()
    let numero = document.querySelector("#numero-contato").value.trim()

    function limparInputs(){
      nomeContatoInput.value = ""
      numeroContatoInput.value = ""
    }
    
    function criarContato(){
      let tr = document.createElement("tr")
    
        tr.innerHTML = 
        `<td>${nome}</td>
        <td>${numero}</td>`
    
        containerContatos.appendChild(tr)
    }
    
    let salvarContato = () => {
      listaContatos.push([nome, numero])
    }
    
    let darAviso = (aviso) => {
      avisoTxt.style.color = "red"
      avisoTxt.style.display = "block"
      avisoTxt.innerHTML = aviso
      setTimeout( () => {
        avisoTxt.style.display = "none"
      }, 2500 )
    }
    
    let AtualizarQuantidadeContato = () => {
      quantidadeContatos++
      quantidadeContatosLabel.innerHTML = quantidadeContatos
    }

    if (nome !== "" && numero !== ""){
      if (listaContatos.some(contato => contato[0] === nome || contato[1] === numero)){
        darAviso("Contato existente")
        limparInputs()
        }

      else {
        AtualizarQuantidadeContato()
        criarContato()
        salvarContato()
        limparInputs()
        }
      }

    else {
      if (nome === "" && numero === "") darAviso("Adicione um nome e número para o contato")
      else if (nome === "" && numero !== "") darAviso("Adicione um nome para o contato")
      else darAviso("Adicione um número para o contato")
      }
    }
  )
}