
function loader(){
	var astuces = ['Si tu es coincé sur une image, n\'hésite pas à demander de l\'aide à tes amis !', 'Repère toi par rapport aux couleurs, aux formes que représentent l\'image', 'Si tu réponds plus vite, tu gagnes plus de points !'];
	var randomAstuce = astuces[Math.floor(Math.random() * astuces.length)];
	console.log(astuces);
	console.log(randomAstuce);
	console.log(document.body);
	document.getElementById('astuces').innerHTML = randomAstuce;
	function hide(){
		document.getElementById('astuce-container').className = "hidden";
	}
	window.setTimeout(function(){ hide(); }, 5000);
}
