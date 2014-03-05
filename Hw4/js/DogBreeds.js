$(function() {
	var timeID = 0;
	$("document").ready(function() {
		$.getJSON("http://csw08724.appspot.com/breeds.ajax", function(data){
			$.each(data, function (key, val) {
					$("<option></option>", {
						"class": "option",
						"id": val.id,
						"value": val.id,
						html: val.name
					}).appendTo("#select");

				});
			onload(1);
		});
		
		$("#select").on("change", function(event) {
			clearInterval(timeID);
			onload(event.target.value);
		});

	});

	
	function onload(id) {
		$.getJSON("http://csw08724.appspot.com/breed.ajax",{"id": id})
			.done(function(data){
				$("#breed-name").text(data.name);
				$("#description").text(data.description);
				$("#origins").text(data.origins);		
				$("#rightForYou").text(data.rightForYou);

				$("#accordion").accordion({
					heightStyle: "content"
				});

				// $("#img").attr("src", "http://csw08724.appspot.com/" + data.imageUrl);
				data.extraImageUrls.splice(0,0,data.imageUrl);
				// console.log(data.extraImageUrls);
				
				var index = 0;
				$("#img").attr("src", "http://csw08724.appspot.com/" + data.extraImageUrls[index]);

				timeID = setInterval(function(){
						$("#slide").hide("slide", {"direction":"left"}, 1000, next).delay(200).show("slide", {"direction":"right"}, 1000);				
					}, 5000);

				function next() {
					index++;
					if (index === data.extraImageUrls.length) {
						index = 0;
					}
					$("#img").attr("src", "http://csw08724.appspot.com/" + data.extraImageUrls[index]);
				}

			});
	}


});