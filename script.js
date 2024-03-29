// Global variables

var count = 0;
var Money = 0;
var baseMake = 1;
var sellButton = document.getElementById('Sell');
var makeButton = document.getElementById('Make');
var countDisplay = document.getElementById('count');
var moneyDisplay = document.getElementById('Money');

class Upgrade {
  constructor(name, cost, effect) {
    this.name = name;
    this.cost = cost;
    this.effect = effect || (() => {});
    this.count = 0;
  }
  apply() {
    this.effect();
  }

  render(upgradesDiv) {
    var button = document.createElement('button');
    button.innerText = this.name + " (" + this.cost + " Money)";
    button.disabled = Money < this.cost;
    button.onclick = () => {
      if(Money >= this.cost){
        Money -= this.cost;
        this.count++;
        this.apply();
        updateDisplay();
        renderUpgrades();
      }
    }
    upgradesDiv.appendChild(button);
  }
}

// Define upgrade instances
var upgrade1 = new Upgrade("Upgrade 1", 100, function(){ baseMake += 2; })
var upgrade2 = new Upgrade("Upgrade 2", 250, function(){ Money += 2; })

function updateDisplay(){
  countDisplay.textContent = "Count: " + count;
  moneyDisplay.textContent = "Money: " + Money;
  renderUpgrades();
}

function renderUpgrades(){
  var upgradesDiv = document.getElementById('upgrades');
  upgradesDiv.innerHTML = '';

  for(let upgrade of [upgrade1, upgrade2]){
    upgrade.render(upgradesDiv);
  }
}

// Event listener for the 'Make' button
makeButton.addEventListener('click', function() {
  count += baseMake;
  console.log("make was pressed");
  console.log("count is now: " + count);
  updateDisplay();
})

sellButton.addEventListener('click', function() {
  if (count > 0){
    count--;
    Money++;
    updateDisplay();
  }
})

// This ensures all event listeners get properly added after page load.
window.onload = function() {
  var brainrotButton = document.getElementById('brainrot'); // Changed the variable name to 'brainrotButton'
  var brainrotvideo = document.getElementById('brainrotvideo');
  brainrotButton.addEventListener('click', function(){ 
   brainrotvideo.style.display = 'block';
  });

  renderUpgrades();
}
