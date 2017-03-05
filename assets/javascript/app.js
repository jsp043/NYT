$("#searchButton").on("click", function(event){
	// prevents reloading of page
	event.preventDefault();
	var search = $("#search-input").val().trim();
	var recordsRequested = $("#records-input").val();
	var startYear = $("#start").val().trim();
	var endYear = $("#end").val().trim();
	var word = encodeURI(search);
	var articleCount = 0;



	var authKey= "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
	
	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
 	 authKey + "&q=";
	  
	 

	$.ajax({
		url: queryURL,
		method: "GET"

		}).done(function(responseNY) {

		var results= responseNY.response.docs;
		console.log(responseNY);
		// empty container to avoid duplicate results
		$("#articles").empty();

		for (i = 0; i < recordsRequested; i++){
			articleCount++;
			var articleDiv = $("<div class ='results'>");
			var title = $("<a class='headlineAnchor'>").text( i + 1 + "." + results[i].headline.main);
			title.attr("href", results[i].web_url);
			title.attr("target", "_blank");
	
			var section = $("<p>").text("Section: " + results[i].section_name);
			var pubDate = $("<p>").text("Dates: " + results[i].pub_date);
			var artURL = $("<a>").text(results[i].web_url);
			artURL.attr("href", results[i].web_url);
			artURL.attr("target", "_blank");

			articleDiv.append(title);
			articleDiv.append(section);
			articleDiv.append(pubDate);
			articleDiv.append(artURL);

			$("#articles").append(articleDiv);
		}
	});
});

$('#clearButton').on('click', function(){
	$("#articles").empty();
})