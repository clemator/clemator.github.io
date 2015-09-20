<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" style="text/css" href="assets/css/index.css">
		<link rel="stylesheet" style="text/css" href="assets/css/bootstrap.min.css">
		<title>Asuldian's Website</title>
		<script src="controllers/auth.js"></script>
		<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
		<script src="http://code.jquery.com/jquery-2.1.0.min.js"></script>
		<script>
			var APIKEY		=	'AIzaSyD6jgZkBrETrJhcnLqZ3IC0A27xQILaQ-U';
			var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
			var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
			var SCOPE       =   'https://www.googleapis.com/auth/youtube';
			var CLIENTID    =   '219191596829-06a8461kjq8lpimgm6vq0csdltct5bu6.apps.googleusercontent.com';
			var REDIRECT    =   'http://www.asuldian.eu'
			var TYPE        =   'token';
			var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
			var acToken;
			var tokenType;
			var expiresIn;
			var user;
			var loggedIn    =   false;
			function login() {
				var win         =   window.open(_url, "windowname1", 'width=800, height=600'); 

				var pollTimer   =   window.setInterval(function() { 
					try {
						console.log(win.document.URL);
						if (win.document.URL.indexOf(REDIRECT) != -1) {
							window.clearInterval(pollTimer);
							var url =   win.document.URL;
							acToken =   gup(url, 'access_token');
							tokenType = gup(url, 'token_type');
							expiresIn = gup(url, 'expires_in');
							win.close();
							console.log(acToken);
							validateToken(acToken);
						}
					} catch(e) {
					}
				}, 100);
			}
			function validateToken(token) {
				$.ajax({
					url: VALIDURL + token,
					data: null,
					success: function(responseText){
						console.log(responseText);
						loggedIn = true;
						getUserInfo();
						getUserFeed();
						$('#loginText').hide();
						$('#logoutText').show();
					},  
					dataType: "jsonp"  
				});
			}

			function gup(url, name) {
				name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
				var regexS = "[\?&]"+name+"=([^&#]*)";
				var regex = new RegExp( regexS );
				var results = regex.exec( url );
				if( results == null )
					return "";
				else
					return results[1];
			}
			
			function getUserInfo() {
				$.ajax({
					url: 'https://gdata.youtube.com/feeds/api/users/default/uploads?access_token=' + acToken,
					data: null,
					success: function(resp) {
						user    =   resp;
						console.log(user);
					},
					dataType: "jsonp"
				});
			}
			
			function getUserFeed() {
				var query = $.ajax({
					type: 'GET',
					dataType: "json",
					url: 'https://www.googleapis.com/youtube/v3/activities?part=snippet&home=true&key=' + APIKEY
				});
				query.done(function() {
					$('#feed-list').empty();
					$.each(query.responseJSON.items, function(i, item) {
						$('#feed-list').append('<li class="span4"><div class="thumbnail"><img src="' + query.responseJSON.items[i].snippet.thumbnails.default.url + '"></div></li>');
					});
				});
			}
			function startLogoutPolling() {
				$('#loginText').show();
				$('#logoutText').hide();
				loggedIn = false;
			}
		</script>
	</head>
	<body>
		<?php include 'views/banner.html'; ?>
		<div id="page-content" class="navbar-text">
			<a href='#' onClick='login();' id="loginText"> Click here to login </a>
			<a href="#" style="display:none" id="logoutText" target='myIFrame' onclick="myIFrame.location='https://www.google.com/accounts/Logout'; startLogoutPolling();return false;"> Click here to logout </a>
			<iframe name='myIFrame' id="myIFrame" style='display:none'></iframe>
			<ul id="feed-list" class="thumbnails">
			</ul>
		</div>
	</body>
</html>
