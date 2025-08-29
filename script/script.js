const res = document.querySelector("#res");
const btnPedra = document.querySelector("#pedra");
const btnPapel = document.querySelector("#papel");
const btnTesoura = document.querySelector("#tesoura");
const btnJogar = document.querySelector("#jogar");
const btnResetar = document.querySelector("#resetar");

let humanSelection = "";
let humanScore = 0;
let computerScore = 0;
let rodada = 1;

function getComputerChoice(){
            let min = 0
            let max = 2;
            let numeroNoIntervalo = Math.floor(Math.random()* (max - min + 1)); // Math floor arredonda o número gerado pelo Math Random pra baixo para ser um número inteiro
            // numeroNoIntervalo não pode ser const pq a variável é iniciamente um número mas depois é convertido pra uma string

            // Como o código está retornando diretamente a string, não precisa reatribuir numeroNoIntervalo para cada escolha nem usar break:
            switch (numeroNoIntervalo){
                case 0:
                    return "pedra";
                case 1:
                    return "papel";
                case 2:
                    return "tesoura";   
                default:
                    return "jogada inválida";
            }
        }

        function playRound(computerSelection, humanSelection){
            if(computerSelection === humanSelection){
                return "Empate!";
            }else if(
                (computerSelection === "pedra" && humanSelection === "tesoura") || 
                (computerSelection === "papel" && humanSelection === "pedra") || 
                (computerSelection === "tesoura" && humanSelection === "papel")
            ){
                return "Computador venceu!";
            }else{
                    return "Você venceu!";
            }
        }

         btnPedra.addEventListener('click', () => {
                humanSelection = "pedra";
            });
            btnPapel.addEventListener('click', () =>{
                humanSelection = "papel";
            });
            btnTesoura.addEventListener('click', () => {
                humanSelection = "tesoura";
            });

            const botoes = [btnPedra, btnPapel, btnTesoura];

            botoes.forEach(botao => {
                botao.addEventListener('click', () => {
                    // Remove a seleção de todos os botões
                    botoes.forEach(b => b.classList.remove('selected'));

                    // Adiciona a seleção apenas no botão clicado
                    botao.classList.add('selected');
                });
            });

        btnJogar.addEventListener('click', () => {
            if(humanSelection === ""){
                res.innerHTML = "Escolha pedra, papel ou tesoura antes de jogar!";
                return;
            }
            const computerSelection = getComputerChoice();

            const resultado = playRound(computerSelection, humanSelection);

            if(resultado === "Você venceu!"){
                humanScore++
            }else if(resultado === "Computador venceu!"){
                computerScore++
            }

            res.innerHTML = `Rodada ${rodada}: ${resultado}  
            Você: ${humanSelection} | Computador: ${computerSelection}<br>  
            Placar: Você ${humanScore} x ${computerScore} Computador<br><br>`;

                if(humanScore === 5){
                    res.innerHTML += "Parabéns! Você ganhou o jogo!";
                    btnJogar.disabled = true;
                }else if(computerScore === 5){
                    res.innerHTML += "O computador ganhou o jogo!";
                    btnJogar.disabled = true;
                }
        });


        btnResetar.addEventListener('click', () => {
            res.innerHTML = "";
            btnJogar.disabled = false;
            humanSelection = "";
            humanScore = 0;
            computerScore = 0;
            rodada = 1;
            
            botoes.forEach(b => b.classList.remove('selected'));
        });

        
        