function hide(){
		document.getElementById('username').style.width = "100%";
		document.getElementById('astuce-container').className = "hidden";
}

function loader(){
	var astuces = ['Si tu es coincé sur une image, n\'hésite pas à demander de l\'aide à tes amis !', 'Repère toi par rapport aux couleurs, aux formes que représentent l\'image', 'Si tu réponds plus vite, tu gagnes plus de points !'];
	var randomAstuce = astuces[Math.floor(Math.random() * astuces.length)];
	document.getElementById('astuces').innerHTML = randomAstuce;

	window.setTimeout(function(){ hide(); }, 5000);
}
