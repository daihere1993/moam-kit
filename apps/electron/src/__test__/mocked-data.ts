export const SVN_STATUS_HTML = `
<html>

<head>
	<title>trunk status</title>
	<link rel='stylesheet' type='text/css' href='../RESOURCES/svn.css'>
</head>

<body>
	<table border=2>
		<tr>
			<td align='center' class=intense-red-gradient colspan=4><b><big><big>trunk - LOCKED</big></big></b><br>
				<font color='yellow'><i>06-06-2020 04:08:27</i></font>
			</td>
		</tr>
		<tr bgcolor='yellow'>
			<th style='width: 80px;'>Binary</th>
			<th style='width: 50px;'>Status</th>
			<th
				style='width: 150px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word'>
				Cause</th>
			<th
				style='width: 100px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word'>
				Admitted</th>
		</tr>

		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>Build coordinators</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;'></td>
		</tr>
		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>ADMIN</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white></td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>C_Test</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> czermak janusz nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>BSTAT</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS kedzia REVISIONS 49037 49039
			</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>CAS</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> </td>
		</tr>
		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>CCI</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> </td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>CEM</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS bughao REVISIONS 10568</td>
			<td style='width: 100px;' bgcolor=white> bughao</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>CONVENG</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS sgroza REVISIONS 14677</td>
			<td style='width: 100px;' bgcolor=white></td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>DCS</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS czoch REVISIONS 110532 110536
			</td>
			<td style='width: 100px;' bgcolor=white> czoch </td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>DEM</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> BRANCH LOCKER</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>FRI</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS flacatus REVISIONS 42060 42061
			</td>
			<td style='width: 100px;' bgcolor=white></td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>GTS</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS ca_gsmbtsscm REVISIONS 29074
				29082 29084 29090</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>HAS</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS janusz kedzia REVISIONS 48971
				48975 48977 48980</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>IMS</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> ighimisi</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>IM_PORT</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> przystan</td>
		</tr>
		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>INCT</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> ighimisi</td>
		</tr>
		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>LOADER</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>LTS</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS janusz REVISIONS 35908 35910
			</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>MCI</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS boczar REVISIONS 28005 28007
				28017 28021</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>MCTRL</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS pmazurek REVISIONS 88995</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>MIG16</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> LOCKED</td>
			<td style='width: 100px;' bgcolor=white> </td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>MOAM</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS skus REVISIONS 180013 180016
			</td>
			<td style='width: 100px;' bgcolor=white> skus marcelo jela kacperki pkochan johberna mangeles rszewczy
				kozdras chuhui z000ghds liangjew l1fan yyou lzhou040 yuzhongl sachnows sbaran gilagan racabrer napinas
			</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>NE3SADAPT</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS hzscm REVISIONS 16995 17003</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-green-gradient' style='width: 80px;'>NTS</td>
			<td align='center' class='intense-green-gradient' style='width: 50px;'>
				<font color=black>unlocked</font>
			</td>
			<td style='width: 150px;'></td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>REM</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> EVN issue</td>
			<td style='width: 100px;' bgcolor=white> </td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>SWM</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS hliwa REVISIONS 36195 36202</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>SYSADAPT</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS lonlin minlin chanli alzheng
				kedzia REVISIONS 85923 85930 85933 85934 85936 85941 85954 85960 85964 85970 85973 86003 86004 86010
			</td>
			<td style='width: 100px;' bgcolor=white> lonlin minlin chanli alzheng kedzia </td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>TAS</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS kedzia REVISIONS 45130 45131
			</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>URI</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS sgroza REVISIONS 24212</td>
			<td style='width: 100px;' bgcolor=white> gpuzio</td>
		</tr>
		<tr>
			<td align='center' class='intense-red-gradient' style='width: 80px;'>WTS</td>
			<td align='center' class='intense-red-gradient' style='width: 50px;'>
				<font color=black>locked</font>
			</td>
			<td style='width: 150px;'> Locked by Autolocker, broken regression. AUTHORS kadamczy REVISIONS 34849</td>
			<td style='width: 100px;' bgcolor=white> nizio</td>
		</tr>
</body>

</html>

`

export const RB_DIFF_HTML = `
<!DOCTYPE html>


<html>

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE" />
	<title>CAS-340383-V2Q9: [ATT_SRAN20B_D2_RLab][FID:10]-&quot;Failure in optical interface&quot; critical alarm was
		detected after eNB SW upgraded to SRAN20B D2 | Diff Viewer | Review Board</title>

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />


	<meta property="og:title"
		content="Diff for Review Request #76439: CAS-340383-V2Q9: [ATT_SRAN20B_D2_RLab][FID:10]-&quot;Failure in optical interface&quot; critical alarm was detected after eNB SW upgraded to SRAN20B D2" />
	<meta property="og:description"
		content="When CPRI_DIALECT_CONF updates RUMAG should delete DialectDetectionMo then create DialectDetectionMo. IS_NEW: true" />
	<meta property="og:url" content="http://biedronka.emea.nsn-net.net/r/76439/diff/" />
	<meta name="twitter:title"
		content="Diff for Review Request #76439: CAS-340383-V2Q9: [ATT_SRAN20B_D2_RLab][FID:10]-&quot;Failure in optical interface&quot; critical alarm was detected after eNB SW upgraded to SRAN20B D2" />
	<meta name="twitter:description"
		content="When CPRI_DIALECT_CONF updates RUMAG should delete DialectDetectionMo then create DialectDetectionMo. IS_NEW: true" />
	<meta name="twitter:url" content="http://biedronka.emea.nsn-net.net/r/76439/diff/" />




	<meta name="twitter:label1" content="Repository" />
	<meta name="twitter:data1" content="moam" />



	<meta name="twitter:label2" content="Branch" />
	<meta name="twitter:data2" content="SBTS20B" />



	<script type="text/javascript">
		var AJAX_SERIAL = "1598790914",
        TEMPLATE_SERIAL = "1558204489",
        SITE_ROOT = "/",
        MANUAL_URL = 'https://www.reviewboard.org/docs/manual/3.0/',
        STATIC_URLS = {
            'rb/images/favicon_notify.ico': '/static/rb/images/favicon_notify.43aac64f3b61.ico',
            'rb/images/resize-grip.png': '/static/rb/images/resize-grip.b822a7e06419.png',
            'rb/images/logo.png': '/static/rb/images/logo.cc81d3ae01b2.png'
        };

	</script>
	<link rel="shortcut icon" type="image/x-icon" href="/static/rb/images/favicon.3161c840d49e.ico" />
	<link rel="apple-touch-icon-precomposed" type="image/png"
		href="/static/rb/images/apple-home-icon.fd8758a2ebe3.png" />

	<link href="/static/rb/css/common.min.d28d91be659a.css" rel="stylesheet" type="text/css" />




	<link href="/static/rb/css/reviews.min.3bc86e20b85c.css" rel="stylesheet" type="text/css" />




	<style type="text/css">
		#diffs.ewhl table.sidebyside .ew {
			background: #ee3434;
		}
	</style>



	<link href="/static/ext/rbintegrations.extension.RBIntegrationsExtension/css/fields.min.7ada3ebb44dc.css"
		rel="stylesheet" type="text/css" />

	<link
		href="/static/ext/rb_test_failures_reporter.extension.TestFailuresReporterExtension/css/rb_test_failures_reporter.min.dc47af4c0b0d.css"
		rel="stylesheet" type="text/css" />

	<link
		href="/static/ext/rb_commit_requirements.extension.CommitRequirementsExtension/css/rb_commit_requirements.min.0983bd042c67.css"
		rel="stylesheet" type="text/css" />

	<link href="/static/ext/rbmotd.extension.MotdExtension/css/default.min.4ece832d20bc.css" rel="stylesheet"
		type="text/css" />

	<link href="/static/ext/rbchecklist.extension.Checklist/css/checklist.min.c22527f28b43.css" rel="stylesheet"
		type="text/css" />


	<!--[if lt IE 7.]>
  <style type="text/css">
    body {
      behavior: url("/static/lib/js/csshover2.40df985cb243.htc");
    }

    img,
    table.sidebyside .commentflag,
    .box.important .box-inner {
      behavior: url("/static/lib/js/pngfix.66b813db86c1.htc");
    }

   #review-banner .banner { position: absolute; }

  </style>
  <![endif]-->
	<!--[if lt IE 8.]>
  <link rel="stylesheet" type="text/css" href="/static/rb/css/ie_hacks.d5248624ea6e.css"></script>
  <![endif]-->

	<script type="text/javascript" src="/static/lib/js/jquery-1.11.1.min.8101d596b2b8.js"></script>
	<script type="text/javascript" src="/static/lib/js/jquery-migrate-1.2.1.min.eb05d8d73b5b.js"></script>



</head>


<body class="reviewable-page">



	<div id="review-banner" class="hidden">
		<div class="banner">
			<h1>You have a pending review.</h1>
			<input id="review-banner-edit" type="button" value="Edit Review" />
			<div id="review-banner-publish-container" class="split-btn">
				<div class="btn btn-segmented">
					<div class="btn-segment primary-btn" id="review-banner-publish">Publish Review
					</div>
					<div class="btn-segment drop-down-btn"><span
     class="rb-icon rb-icon-dropdown-arrow"></span></div>
				</div>
			</div>
			<input id="review-banner-discard" type="button" value="Discard" />
 </div>
		</div>


		<div id="mobile_navbar_container">




			<div id="mobile_account_menu">

				<ul>
					<li><a href="/account/login/?next=/r/76439/diff/"><span class="fa fa-sign-in"></span> Log in</a>
					</li>
					<li><a href="/account/register/">Register</a></li>
				</ul>

			</div>

			<ul id="mobile_page_nav">


				<li><a href="/r/">All Review Requests</a></li>
				<li><a href="/users/">Users</a></li>
				<li><a href="/groups/">Groups</a></li>




			</ul>

			<ul id="mobile_account_menu_footer">
				<li><a href="https://www.reviewboard.org/docs/manual/3.0/"><span class="fa fa-book"></span> Docs</a>
				</li>
				<li><a href="/support/"><span class="fa fa-question-circle"></span> Support</a></li>

			</ul>


		</div>

		<div id="container">
			<div id="topbar">



				<div id="headerbar">




					<div id="rbinfo">
						<a href="/"><img id="logo" src="/static/rb/images/logo.cc81d3ae01b2.png" srcset="/static/rb/images/logo.cc81d3ae01b2.png 1x, /static/rb/images/logo@2x.4e25cc3cacef.png 2x" alt="" border="0" width="60" height="57" /></a>
							<h1 id="title">
								<a href="/">Review Board</a>
								<span class="version">3.0.14</span>
							</h1>
					</div>

					<div id="nav_toggle"><span class="fa fa-navicon"></span></div>
					<ul id="accountnav">



						<li>
							<a href="#">
								Follow
								<span class="rb-icon rb-icon-dropdown-arrow"></span>
							</a>
							<ul>
								<li><a href="https://www.reviewboard.org/news/"><span class="fa fa-rss"></span> Review
										Board News</a></li>
								<li><a href="https://twitter.com/reviewboard/"><span class="fa fa-twitter"></span>
										Twitter</a></li>
								<li><a href="https://www.facebook.com/reviewboard.org"><span class="fa fa-facebook"></span>
										Facebook</a></li>
								<li><a href="https://reddit.com/r/reviewboard"><span class="fa fa-reddit"></span>
										Reddit</a></li>
								<li><a href="https://www.youtube.com/channel/UCTnwzlRTtx8wQOmyXiA_iCg"><span class="fa fa-youtube"></span>
										YouTube</a></li>
							</ul>
						</li>

						<li>
							<a href="#">
								Support
								<span class="rb-icon rb-icon-dropdown-arrow"></span>
							</a>
							<ul>
								<li><a href="https://www.reviewboard.org/docs/manual/3.0/">Documentation</a></li>
								<li><a href="/support/">Get Support</a></li>
							</ul>
						</li>

						<li><a href="/account/login/?next=/r/76439/diff/">Log in</a></li>







					</ul>

					<div id="search">

						<form method="get" action="/search/">

							<input type="search" name="q" placeholder="Search" id="search_field"  />

  </form>

					</div>
				</div>


				<div id="navbar-container">



					<ul id="navbar">


						<li><a href="/r/">All Review Requests</a></li>
						<li><a href="/users/">Users</a></li>
						<li><a href="/groups/">Groups</a></li>


					</ul>



					<div id="motd" style="display: none;">
						<a href="#" id="motd-close" class="ui-icon ui-icon-closethick" title="Dismiss"></a>
						<span id="motd-message">In case of any issues please follow<a href="https://confluence.int.net.nokia.com/display/MANO/Review+Board"> RB guide on Confluence</a>,
To identify OAM revisions currently used in CPI please check:<a href="http://lteomci.inside.nsn.com:10101/precommit1/job/CPI+custom.CPIVALIDATORS/job/trunk/lastSuccessfulBuild/artifact/validator_metadata.txt">TRUNK</a>
<p style="color:red">MOAM UT and cppcheck have been disabled on trunk untill MOAM team fixes them.</b></p></span>
					</div>

					<script>
						$(document).ready(function() {
        var $motd = $('#motd');

        $('#motd-close').click(function() {
            $.cookie('rbmotd', '7b040c346c0924fcd54ddb5a65d2e2e35e870f422e01f70605ac03e13c663296-closed', {
                path: SITE_ROOT
            });

            $motd.remove();

            return false;
        });

        if ($.cookie('rbmotd') !== '7b040c346c0924fcd54ddb5a65d2e2e35e870f422e01f70605ac03e13c663296-closed') {
            $motd.show();
        } else {
            $motd.remove();
        }
    });
					</script>



				</div>

			</div>

			<div id="page-container">
				<noscript>
					<div class="box-container">
						<div class="box important">
							<div class="box-inner">

								<h1>JavaScript is turned off</h1>
								<p>Review Board requires JavaScript in order to function.
									Please turn it on in your browser preferences.</p>
								<p>Firefox users: if you prefer to turn on JavaScript only
									for specific sites, we recommend the
									<a href="https://addons.mozilla.org/en-US/firefox/addon/722">NoScript
										extension</a>.</p>

							</div>
						</div>
					</div>

				</noscript>
				<div id="error"></div>
				<div id="content_container">

					<div id="content">





						<div id="review-request">
							<div id="review-request-banners"></div>


							<div class="review-request">


								<div class="review-request-header">
									<ul class="review-request-actions review-request-tabs">

										<li class="review-request-action">
											<a href="/r/76439/">Reviews</a>
										</li>

										<li class="review-request-action active">
											<a href="/r/76439/diff/#index_header">Diff</a>
										</li>

									</ul>

									<div class="review-request-actions-container">
										<ul class="review-request-actions review-request-actions-left">

										</ul>
										<ul class="review-request-actions review-request-actions-right-container">
											<li class="review-request-action has-menu">
												<a href="#"
													class="mobile-actions-menu-label"><span class="fa fa-ellipsis-h fa-lg"></span></a>
												<ul class="review-request-actions review-request-actions-right">
													<li class="review-request-action">
														<a id="poke-reviewers" href="#">Poke Reviewers</a>
													</li>
													<li class="review-request-action">
														<a id="retrigger-tests" href="#">Retrigger CI Tests</a>
													</li>
													<li class="review-request-action">
														<a id="report-worklog" href="#">Log Work</a>
													</li>
													<li class="review-request-action">
														<a id="force-pass-button" href="#">Force Pass Tests</a>
													</li>

													<li class="review-request-action has-menu">
														<a class="menu-title" id="report-ci-issue-dict-menu-action"
															href="#">Report CI Issue
															<span class="rb-icon rb-icon-dropdown-arrow"></span></a>
														<ul class="menu">
															<li class="review-request-action">
																<a id="jira_create_ticket_link" href="#">Report CI Issue
																	to SCM</a>
															</li>

														</ul>
													</li>

													<li class="review-request-action has-menu">
														<a class="menu-title" id="report-test-issue-dict-menu-action"
															href="#">Report Test Issue
															<span class="rb-icon rb-icon-dropdown-arrow"></span></a>
														<ul class="menu">
															<li class="review-request-action">
																<a id="report-pit-issue" href="#">Report PIT Issue</a>
															</li>
															<li class="review-request-action">
																<a id="report-smoketests-issue" href="#">Report
																	smoketests Issue</a>
															</li>

														</ul>
													</li>

													<li class="review-request-action has-menu">
														<a class="menu-title" id="mark-tests-as-passed-dict-menu-action"
															href="#">Mark Tests as Passed
															<span class="rb-icon rb-icon-dropdown-arrow"></span></a>
														<ul class="menu">
															<li class="review-request-action">
																<a id="mark-pit-passed" href="#">Mark PIT as Passed</a>
															</li>
															<li class="review-request-action">
																<a id="mark-smoketests-passed" href="#">Mark smoketests
																	as Passed</a>
															</li>

														</ul>
													</li>

													<li class="review-request-action has-menu">
														<a class="menu-title" id="commit-and-submit-dict-menu-action"
															href="#">Commit and Submit
															<span class="rb-icon rb-icon-dropdown-arrow"></span></a>
														<ul class="menu">
															<li class="review-request-action">
																<a id="commit_link_all" href="#">This and Dependent
																	Reviews</a>
															</li>
															<li class="review-request-action">
																<a id="commit_link_this" href="#">Only This Change</a>
															</li>
															<li class="review-request-action">
																<a id="commit_link_dependencies" href="#">Only Dependent
																	Reviews</a>
															</li>
															<li class="review-request-action">
																<a id="change_svn_credentials_link" href="#">Add/Change
																	SVN Credentials</a>
															</li>

														</ul>
													</li>
													<li class="review-request-action">
														<a id="download-diff-action" href="raw/">Download Diff</a>
													</li>

												</ul>
											</li>
										</ul>
									</div>
								</div>


								<div class="review-request-body">




									<div class="review-request-section review-request-summary">


										<label class="review-request-section-label" for="field_summary">Summary: </label>


										<h1 id="field_summary" data-field-id="summary" class="field required editable">
											CAS-340383-V2Q9: [ATT_SRAN20B_D2_RLab][FID:10]-&quot;Failure in optical
											interface&quot; critical alarm was detected after eNB SW upgraded to SRAN20B
											D2</h1>



										<p>

											Review Request <a href="/r/76439/">#76439</a>
											&mdash;
											Created Aug. 20, 2020 and updated <time class="timesince"
												datetime="2020-08-26T08:45:39.135268+00:00">Aug. 26, 2020, 8:45
												a.m.</time> &mdash; Latest diff uploaded <time class="timesince"
												datetime="2020-08-20T08:32:03.622416+00:00">Aug. 20, 2020, 8:32
												a.m.</time>

										</p>


									</div>

									<div id="req-info" class="review-request-section">
										<span class="review-request-section-label">Commit requirements</span>
										<div class="field-container">
											<p>To commit this review request, requirements below have to be
												fulfilled:</p>
											<ul class="commit-requirements">
												<li>
													No open issues

													<span class="rb-icon rb-icon-issue-resolved"></span>

												</li>
												<li>

													2 ship it(s)

													from targeted reviewers (or in targeted group). Now:
													2/2

													<span class="rb-icon rb-icon-issue-resolved"></span>



													<p class="requirement-note">Note: User
														can ship it once per diff revision and can't ship it his own
														request.</p>
												</li>

												<li>

													All tests with given regexes are present and

													passed within last 7 days:

													.*(BUILD|MOAM)\.(ASIK|ASIB|ARM|MIPS|X86_64), .*\.UT.*,
													.*(\.MT|ALMAG\.UT|ADET\.UT|SPMAG\.UT).*, .*(SCT|PYTEST).*, .*PIT.*,
													.*RFT.*, ^SMOKE.*


													<span class="rb-icon rb-icon-issue-resolved"></span>

												</li>


												<li>
													Has changes in tests,
													unless changes are only in directory/directories matching
													regex: bpfng|.*doc.*|.*docs.*


													<span class="rb-icon rb-icon-issue-resolved"></span>

													<p class="requirement-note">Note: Requirement only for
														pronto corrections.</p>
												</li>

											</ul>
										</div>
									</div>


									<div id="review-request-warning"></div>



									<table id="review-request-details" class="review-request-section">
										<colgroup>
											<col width="0%" />
											<col width="100%" />
										</colgroup>




										<thead id="fieldset_info_head">
											<tr>
												<th class="review-request-section-label" colspan="2">Information

											</tr>
										</thead>
										<tbody id="fieldset_info_body">

											<tr>
												<th><label for="field_submitter">Owner:</label></th>
												<td>
													<span id="field_submitter"
              data-field-id="submitter"
              class="field required editable"


              ><a class="user" href="/users/zowu/">zowu</a></span>

												</td>
											</tr>

											<tr>
												<th><label for="field_repository">Repository:</label></th>
												<td>
													<span id="field_repository"
              data-field-id="repository"
              class="field "


              >moam</span>

												</td>
											</tr>

											<tr>
												<th><label for="field_branch">Branch:</label></th>
												<td>
													<span id="field_branch"
              data-field-id="branch"
              class="field editable"


              >SBTS20B</span>

												</td>
											</tr>

											<tr>
												<th><label for="field_bugs_closed">Bugs:</label></th>
												<td>
													<span id="field_bugs_closed"
              data-field-id="bugs_closed"
              class="field comma-editable editable"


              ></span>

												</td>
											</tr>

											<tr>
												<th><label for="field_depends_on">Depends On:</label></th>
												<td>
													<span id="field_depends_on"
              data-field-id="depends_on"
              class="field comma-editable editable"


              ></span>

												</td>
											</tr>

										</tbody>



										<thead id="fieldset_reviewers_head">
											<tr>
												<th class="review-request-section-label" colspan="2">Reviewers

											</tr>
										</thead>
										<tbody id="fieldset_reviewers_body">

											<tr>
												<th><label for="field_target_groups">Groups:</label></th>
												<td>
													<span id="field_target_groups"
              data-field-id="target_groups"
              class="field comma-editable editable"


              ></span>

												</td>
											</tr>

											<tr>
												<th><label for="field_target_people">People:</label></th>
												<td>
													<span id="field_target_people"
              data-field-id="target_people"
              class="field comma-editable editable"


              ><a href="/users/gaxu/" class="user">gaxu</a>, <a href="/users/wintang/" class="user">wintang</a></span>

												</td>
											</tr>

										</tbody>


									</table>

									<div id="review-request-main">




										<div class="review-request-section">
											<label class="review-request-section-label" for="field_description">Description</label>
											<div class="field-container">
												<pre id="field_description" data-field-id="description"
													class="field required editable field-text-area rich-text"
													data-allow-markdown="True"><p>When CPRI_DIALECT_CONF updates RUMAG should delete DialectDetectionMo then create DialectDetectionMo.<br />
IS_NEW: true</p></pre>

											</div>
										</div>



										<div class="review-request-section">
											<label class="review-request-section-label" for="field_testing_done">Testing Done</label>
											<div class="field-container">
												<pre id="field_testing_done" data-field-id="testing_done"
													class="field editable field-text-area rich-text"
													data-allow-markdown="True"><p>UT</p></pre>

											</div>
										</div>



										<div class="review-request-section">
											<label class="review-request-section-label" for="field_svn_commit_message">Commit Message</label>
											<div class="field-container">
												<pre id="field_svn_commit_message" data-field-id="svn_commit_message"
													class="field editable field-text-area">REFERENCE               :
COMPLETED               :
JIRA_ID                 :
DESCRIPTION             :
AUTHOR                  : zowu
ACCEPTED_BY             : RB 76439
</pre>

											</div>
										</div>


									</div>




									<div id="review-request-extra">


										<div class="review-request-section" style="display: none;">
											<label class="review-request-section-label">Screenshots</label>
											<div id="screenshot-thumbnails">

												<br clear="both" />
  </div>
											</div>

											<div id="file-list-container" class="review-request-section clearfix"
												style="display: none;">
												<label class="review-request-section-label">Files</label>
												<div id="review-request-files-placeholder">
													<span class="fa fa-spinner fa-pulse" aria-hidden="true"></span>
													Loading file attachments...
												</div>
												<div id="file-list">
													<br clear="both" />
  </div>
												</div>




											</div>




											<div id="diff-details" class="review-request-section loading">
												<a name="index_header"></a>
												<div id="diff_revision_label"></div>
												<div id="diff_revision_selector"></div>
												<div id="diff_comments_hint"></div>
												<div id="diff_index"><span class="fa fa-spinner fa-pulse"></span></div>
												<div id="pagination1"></div>
											</div>
										</div>
									</div>
								</div>

								<ul id="view_controls">

									<li><a href=".?expand=1"><span class="fa fa-plus"></span> Expand changes</a></li>


									<li class="ew" style="display:none;"><a href="#"
											class="toggle-show-whitespace"><span class="fa fa-minus"></span> Hide extra
											whitespace</a></li>
									<li class="ew"><a href="#"
											class="toggle-show-whitespace"><span class="fa fa-plus"></span> Show extra
											whitespace</a></li>

									<li class="ws"><a href="#"
											class="toggle-whitespace-only-chunks"><span class="fa fa-minus"></span> Hide
											whitespace changes</a></li>
									<li class="ws" style="display:none;"><a href="#"
											class="toggle-whitespace-only-chunks"><span class="fa fa-plus"></span> Show
											whitespace changes</a></li>
								</ul>

								<div id="diffs"></div>
								<div id="pagination2"></div>





							</div>
						</div>
					</div>
				</div>
				<div id="activity-indicator">
					<span class="fa fa-spinner fa-pulse"></span>
					<span class="indicator-text">Loading...</span>
				</div>
				<script src="/jsi18n/"></script>

				<script type="text/javascript" src="/static/lib/js/jquery-ui-1.8.24.custom.min.f6148fb67d77.js">
				</script>

				<script type="text/javascript" src="/static/lib/js/3rdparty.min.1719e20827dd.js" charset="utf-8">
				</script>
				<script type="text/javascript" src="/static/djblets/js/jquery.gravy.min.e24d040808fd.js"
					charset="utf-8"></script>
				<script type="text/javascript" src="/static/djblets/js/utils.min.84b7b8c324db.js" charset="utf-8">
				</script>
				<script type="text/javascript" src="/static/djblets/js/extensions.min.1d8986b3c3cd.js" charset="utf-8">
				</script>
				<script type="text/javascript" src="/static/rb/js/base.min.af574b99af97.js" charset="utf-8"></script>
				<script>
					RB.UserSession.create({

        authenticated: false,
        loginURL: "/account/login/"

    });

    RB.EnabledFeatures = {
        issueVerification: true,
        generalComments: true
    };

    new RB.HeaderView({ el: $('#headerbar') });
				</script>


				<script type="text/javascript" src="/static/rb/js/reviews.min.62c9e1499e46.js" charset="utf-8"></script>



				<script>
					RB.PageManager.setPage(new RB.DiffViewerPageView({
        el: document.body,
        model: new RB.DiffViewerPage({
            "files": [{"comment_counts": [], "index": 3, "deleted": false, "dest_revision": "New Change", "id": 5498263, "filediff": {"id": 5498263, "revision": 1}, "binary": false, "depot_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/src/include/RadioScenarioModule/RadioStartup/Cpri/CpriDialectHandler.hpp", "dest_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/src/include/RadioScenarioModule/RadioStartup/Cpri/CpriDialectHandler.hpp", "newfile": false, "revision": "Revision 185168"}, {"comment_counts": [], "index": 2, "deleted": false, "dest_revision": "New Change", "id": 5498264, "filediff": {"id": 5498264, "revision": 1}, "binary": false, "depot_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/src/static/RadioScenarioModule/RadioStartup/Cpri/CpriDialectHandler.cpp", "dest_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/src/static/RadioScenarioModule/RadioStartup/Cpri/CpriDialectHandler.cpp", "newfile": false, "revision": "Revision 185168"}, {"comment_counts": [], "index": 1, "deleted": false, "dest_revision": "New Change", "id": 5498265, "filediff": {"id": 5498265, "revision": 1}, "binary": false, "depot_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/src/static/Rp1Agent/CpriPortHandler.cpp", "dest_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/src/static/Rp1Agent/CpriPortHandler.cpp", "newfile": false, "revision": "Revision 185168"}, {"comment_counts": [], "index": 0, "deleted": false, "dest_revision": "New Change", "id": 5498266, "filediff": {"id": 5498266, "revision": 1}, "binary": false, "depot_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/test/UT/tests/RadioScenarioModule/RadioStartup/Cpri/CpriDialectHandlerTests.cpp", "dest_filename": "branches/maintenance/SBTS20B/SC_MONOLITH/DM_RUMAG/test/UT/tests/RadioScenarioModule/RadioStartup/Cpri/CpriDialectHandlerTests.cpp", "newfile": false, "revision": "Revision 185168"}], "pagination": {"has_next": false, "page_numbers": [1], "current_page": 1, "has_previous": false, "is_paginated": false, "pages": 1}, "num_diffs": 1, "revision": {"interdiff_revision": null, "is_draft_interdiff": null, "latest_revision": 1, "is_draft_diff": null, "is_interdiff": false, "revision": 1}, "filename_patterns": [], "comments_hint": {"diffsets_with_comments": [], "has_other_comments": false, "interdiffs_with_comments": []},
            checkUpdatesType: 'diff',

            lastActivityTimestamp: "2020-08-26T08:45:39Z",

            "extraReviewRequestDraftData": {}, "checkForUpdates": true, "reviewRequestData": {"targetPeople": [{"username": "gaxu", "url": "/users/gaxu/"}, {"username": "wintang", "url": "/users/wintang/"}], "bugTrackerURL": "/r/76439/bugs/--bug_id--/", "description": "When CPRI_DIALECT_CONF updates RUMAG should delete DialectDetectionMo then create DialectDetectionMo.\nIS_NEW: true", "reviewURL": "/r/76439/", "hasDraft": false, "testingDoneRichText": true, "public": true, "lastUpdatedTimestamp": "2020-08-26T08:45:39Z", "bugsClosed": [], "targetGroups": [], "closeDescriptionRichText": false, "state": "PENDING", "summary": "CAS-340383-V2Q9: [ATT_SRAN20B_D2_RLab][FID:10]-\"Failure in optical interface\" critical alarm was detected after eNB SW upgraded to SRAN20B D2", "branch": "SBTS20B", "testingDone": "UT", "descriptionRichText": true, "closeDescription": "", "localSitePrefix": "", "id": 76439, "repository": {"supportsPostCommit": true, "name": "moam", "requiresChangeNumber": false, "requiresBasedir": true, "scmtoolName": "Subversion", "id": 18}}, "editorData": {"closeDescriptionRenderedText": "", "hasDraft": false, "mutableByUser": false, "showSendEmail": true, "statusMutableByUser": false}
        }, {
            parse: true
        })
    }));
				</script>






				<script type="text/javascript"
					src="/static/ext/rb_poke_reviewers.extension.PokeReviewersExtension/js/rb_poke_reviewers.min.ed646cd3b209.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_svncommit.extension.SvnCommitExtension/js/rb_svncommit.min.62473c2df5ed.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rbintegrations.extension.RBIntegrationsExtension/js/fields.min.a39ae7ef00b5.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_test_failures_reporter.extension.TestFailuresReporterExtension/js/rb_test_failures_reporter.min.5412942352d8.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_reviewed_files.extension.ReviewedFilesExtension/js/default.min.e1bb71ab2a2e.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_commit_requirements.extension.CommitRequirementsExtension/js/rb_commit_requirements.min.92158f270591.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_report_worklog.extension.ReportWorklogExtension/js/rb_report_worklog.min.0525247b7b3f.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_jira_ticket_button.extension.JiraTicketButtonExtension/js/default.min.05f37dcd338d.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_crosslinkjira.extension.CrossLinkJiraExtension/js/default.min.98633b4d60ed.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rb_improvement_ticket.extension.ImprovementTicketExtension/js/rb_improvement_ticket.min.ed2d709fda50.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rbcommenttype.extension.CommentTypeExtension/js/comment-type.min.21b102f5917a.js"
					charset="utf-8"></script>
				<script type="text/javascript"
					src="/static/ext/rbchecklist.extension.Checklist/js/checklist.min.e538e24e4c4b.js" charset="utf-8">
				</script>
				<script type="text/javascript"
					src="/static/ext/rb_retrigger_tests.extension.RetriggerTestsExtension/js/rb_retrigger_tests.min.748a7516774d.js"
					charset="utf-8"></script>



				<script>
					new PokeReviewers.Extension({

        id: 'rb_poke_reviewers.extension.PokeReviewersExtension',
        name: 'Poke Reviewers',
        urlName: 'view-diff',
        settings: {"_extension_installed_version": "1.0.3"}
    });

    new RbSvnCommit.Extension({

        id: 'rb_svncommit.extension.SvnCommitExtension',
        name: 'SvnCommit',
        urlName: 'view-diff',
        settings: {"autocommit_server": "http://localhost:1245/", "autocommit_username": "ca_mzci", "autocommit_password": "TXSyd2Ejy1LRKwHuka7xFhnT3ZMrSgtS", "has_errors": "No errors", "repository_test_exceptions": {"moam": "bpfng"}, "repository_test_directories": {"C_Test": ".*", "DEFAULT": "/(test|tst|testcases)/", "InfoModel": ".*", "MANO_Docs": ".*"}, "repository_shipits": {"DEFAULT": {"total": 2, "mandatory": 0}, "dem": {"total": 2, "mandatory": 1}}, "_extension_installed_version": "1.10.16", "repository_test_settings": {"C_Test": ["PIT"], "lts": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*"], "moam": [".*BUILD.*", ".*UT.*", ".*(SCT|PYTEST).*"], "nrts": [".*BUILD.*", ".*UT.*", ".*MT.*"], "swm": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*"], "mci": [".*BUILD.*", ".*UT.*", ".*MT.*"], "mctrl": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*"], "fri": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*PIT.*"], "tas": [".*BUILD.*", ".*UT.*", ".*(SCT|PYTEST).*"], "DEFAULT_TESTS": [""], "bstat": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*", ".*clangformat.*"], "wts": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*"], "dem": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "has": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*"], "dcs": [".*BUILD.*", ".*UT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "MANO_Docs": [".*Documentation.*", ".*CI_src_patch.*"], "sysadapt": [".*BUILD.*", ".*UT.*", ".*MT.*", ".*(SCT|PYTEST).*"]}}
    });

    new TestFailuresReporter.Extension({

        id: 'rb_test_failures_reporter.extension.TestFailuresReporterExtension',
        name: 'Test Failures Reporter',
        urlName: 'view-diff',
        settings: {"smoketests_groups": "I_MN_BTSOAM_PZ_OM_SMOKE,\r\nI_NSB_MN_BTSOAM_SMOKETEST_HZ,\r\nI_MN_MANO_RD_OM_RADIOCTRL_HWT_SMOKE,\r\nI_MN_BTSOAM_RD_OM_FMRECOV_HWT_SMOKE,\r\nI_BTS_OAM_BUILDCOORDINATORS", "pit_marking_extra_users": "lonlin\r\nadmin\r\ndaschmid", "ldap_password": "HE7BCAzmK7O48HcHhl6HcDxQMaCATaFT0zeThwuap+0=", "ldap_username": "MBB_SRAN_OMCP_Acc", "smoketests_email_group": "I_MN_BTSOAM_SMOKETEST@internal.nsn.com", "confluence_username": "Ca_boam ", "confluence_password": "37Du3D6hYXiDvOTaMiMrUjreNXvATS8=", "_extension_installed_version": "1.6.8", "pit_debug_email": ""}
    });

    new ReviewedFiles.Extension({

        id: 'rb_reviewed_files.extension.ReviewedFilesExtension',
        name: 'ReviewedFiles',
        urlName: 'view-diff',
        settings: {"_extension_installed_version": "1.0.2"}
    });

    new ForcePassTests.Extension({

        id: 'rb_commit_requirements.extension.CommitRequirementsExtension',
        name: 'Commit requirements',
        urlName: 'view-diff',
        settings: {"test_submitters": {"DEFAULT": ["pietkiew", "zawadzki", "agrzelak", "kedzia", "nizio", "pbialek", "janusz", "filipkie", "woch", "pwinkel", "kacperki", "pkochan", "czoch", "mgoral", "birowski", "sosnicki", "fiolka", "chuhui", "podhajec", "tstankie", "magdarao", "hliwa", "sbaran", "bismanos", "wieclaw", "sochiera", "aszczerb", "dbiro", "lonlin", "sachnows", "smedelea", "atatucu", "drankiew", "y14guo", "skowalew", "tstankie", "krysiewi", "kfilipow", "boczar", "kortowsk", "irayya", "moisin", "Bommiset", "Krishd", "Nandp", "Kamgupta", "Mallim", "Menon", "z001m4rx", "Srsarma", "Yarlagad", "liuhuang"]}, "repository_test_exceptions": {"DEFAULT": ".*doc.*|.*docs.*", "moam": "bpfng|.*doc.*|.*docs.*"}, "specific_reviewers": true, "test_validity": 7, "repository_test_directories": {"C_Test": ".*", "DEFAULT": "/(test|tst|testcases)/", "InfoModel": ".*", "MANO_Docs": ".*"}, "repository_shipits": {"C_Test": {"one_per_group": false, "total": 2, "mandatory": 2}, "DEFAULT": {"one_per_group": false, "total": 2, "mandatory": 0}, "InfoModel": {"one_per_group": true, "total": 0, "mandatory": 2}, "CU_C_Test": {"one_per_group": false, "total": 3, "mandatory": 2}, "dcs": {"one_per_group": false, "total": 2, "mandatory": 1}, "dem": {"one_per_group": false, "total": 2, "mandatory": 1}, "cu_vdu_pit": {"one_per_group": false, "total": 2, "mandatory": 2}, "MANO_Docs": {"total": 0, "one_per_group": true, "guidelines": "http://oam.emea.nsn-net.net/btsom_efs/guidelines/Reviewing_Documentation/review_mandatory_reviewers.html", "mandatory": 1}}, "_extension_installed_version": "1.3.7", "repository_tests": {"C_Test": ["^PIT"], "lts": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "moam": [".*(BUILD|MOAM)\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*(\\.MT|ALMAG\\.UT|ADET\\.UT|SPMAG\\.UT).*", ".*(SCT|PYTEST).*", ".*PIT.*", ".*RFT.*", "^SMOKE.*"], "has": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "swm": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*SCT.*", ".*PIT.*"], "mci": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*PIT.*"], "mctrl": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*(SCT|PYTEST).*", ".*(clangformat|CPPLINT).*", ".*PIT.*"], "DEFAULT": [""], "InfoModel": [".*(BUILD|MOAM)\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*(UT|MT).*", ".*(SCT|PYTEST).*", "PIT"], "rfsav": [".*BUILD\\.X86_64", ".*\\.UT.*"], "wts": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "bstat": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*(SCT|PYTEST).*", ".*clangformat.*", ".*PIT.*"], "tas": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64|RCP|RCP_OAM)", ".*\\.UT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "dem": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*SCT.*", ".*PIT.*"], "nts": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "fri": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*PIT.*"], "dcs": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*(SCT|PYTEST).*", ".*PIT.*"], "MANO_Docs": [".*Documentation.*", ".*CI_src_patch.*"], "sysadapt": [".*BUILD\\.(ASIK|ASIB|ARM|MIPS|X86_64)", ".*\\.UT.*", ".*\\.MT.*", ".*(SCT|PYTEST).*", ".*PIT.*"]}}
    });

    new RBReportWorklog.Extension({

        id: 'rb_report_worklog.extension.ReportWorklogExtension',
        name: 'Report JIRA Worklog',
        urlName: 'view-diff',
        settings: {"_extension_installed_version": "1.0.1", "jira_server": "https://jiradc.ext.net.nokia.com/"}
    });

    new JiraTicketButton.Extension({

        id: 'rb_jira_ticket_button.extension.JiraTicketButtonExtension',
        name: 'JiraTicketButton',
        urlName: 'view-diff',
        settings: {"jira_server": "https://jiradc.ext.net.nokia.com/", "jira_ticket_component": "BOAM CPI", "jira_password": "f9feTQ3ReIyBLJvxvfrjUNeayHuh8dE=", "_extension_installed_version": "1.5.8", "jira_username": "Ca_boam", "jira_project_key": "FCA_SCM_CI"}
    });

    new CrossLinkJira.Extension({

        id: 'rb_crosslinkjira.extension.CrossLinkJiraExtension',
        name: 'CrossLinkJira',
        urlName: 'view-diff',
        settings: {"_extension_installed_version": "1.3.1", "jira_password": "SWxPdlda8MuWHX9IZroeDb6jGAPlvig=", "jira_username": "Ca_boam", "jira_server": "https://jiradc.ext.net.nokia.com"}
    });

    new RbImprovementTicket.Extension({

        id: 'rb_improvement_ticket.extension.ImprovementTicketExtension',
        name: 'Improvement Ticket Button',
        urlName: 'view-diff',
        settings: {"_extension_installed_version": "1.0.2", "domains_to_projects": {"SOAM_HAS_FDDPLH": "HRANOMMNL", "SOAM_HAS_SPMAG": "MEE", "SOAM_TAS": "JFP", "SOAM_HAS_RUEMLOG": "JFP", "SOAM_HAS_IPSVC": "HRANOMMNL", "SOAM_HAS_RUMAG_OPENCPRI": "MEE", "SOAM_NE3SADAPT": "MANOEFS", "SOAM_SMS": "JFP", "SOAM_HAS_TDDPLH": "MEE", "SOAM_PIT": "MEE", "SOAM_FRI": "JFP", "SOAM_GTS": "JFP", "SOAM_HAS_BBC": "HRANOMMNL", "SOAM_SWM": "JFP", "SOAM_HAS_VNMAG": "MEE", "SOAM_BSTAT": "JFP", "SOAM_MCI": "JFP", "SOAM_MCTRL": "JFP", "SOAM_HAS_RUMAG": "HRANOMMNL", "SOAM_HAS_SEC": "JFP", "SOAM_HAS_TRUMAG": "MEE", "SOAM_HAS_PDUMAG": "HRANOMMNL", "SOAM_URI": "JFP", "SOAM_HAS_ADET": "MEE", "SOAM_HAS_ALMAG": "HRANOMMNL", "SOAM_WTS": "HRANOMMNL", "SOAM_SYSADAPTER_CDM": "MEE", "SOAM_CCI": "JFP", "SOAM_DCS": "HRANOMMNL", "SOAM_NRTS": "JFP", "SOAM_MOAM_UTIL": "JFP", "SOAM_LIM": "JFP", "SOAM_SYSADAPTER_CBRS": "MEE", "SOAM_LTS": "JFP", "SOAM_DEM": "JFP", "SOAM_HAS_BMSYNC": "JFP", "SOAM_REM": "JFP"}, "jira_username": "Ca_boam", "jira_password": "unhBJy3z7ky56mTdh7U5mN9fd2JUb5I=", "jira_server": "https://jiradc.ext.net.nokia.com"}
    });

    new RBCommentType.Extension({

        id: 'rbcommenttype.extension.CommentTypeExtension',
        name: 'Comment Categorization',
        urlName: 'view-diff',
        settings: {"_extension_installed_version": "1.0.1", "require_type": true, "types": [{"visible": true, "type": "Major"}, {"visible": true, "type": "Minor"}, {"visible": true, "type": "Info"}, {"visible": true, "type": "CG violation"}, {"visible": true, "type": "Further development"}]}
    });

    new RBRetriggerTests.Extension({

        id: 'rb_retrigger_tests.extension.RetriggerTestsExtension',
        name: 'Retrigger Tests Button',
        urlName: 'view-diff',
        settings: {"_extension_installed_version": "1.0.3", "failure_report_regex": "((PIT|Smoketests) issue reported to)|(Created JIRA issue for misbehaviour in CPI test flow)", "validate_failure_report": true}
    });

				</script>





				<script>
					RB.PageManager.beforeRender(function(page) {
    var reviewRequestEditorView = page.reviewRequestEditorView,
        model = reviewRequestEditorView.model;




    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.SummaryFieldView({
            el: $('#field_summary'),
            fieldID: 'summary',
            model: model
        }));



    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.DescriptionFieldView({
            el: $('#field_description'),
            fieldID: 'description',
            model: model
        }));



    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.TestingDoneFieldView({
            el: $('#field_testing_done'),
            fieldID: 'testing_done',
            model: model
        }));



    reviewRequestEditorView.addFieldView(
        new RbSvnCommit.CommitMessageFieldView({
            el: $('#field_svn_commit_message'),
            fieldID: 'svn_commit_message',
            model: model
        }));





    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.OwnerFieldView({
            el: $('#field_submitter'),
            fieldID: 'submitter',
            model: model
        }));





    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.BranchFieldView({
            el: $('#field_branch'),
            fieldID: 'branch',
            model: model
        }));



    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.BugsFieldView({
            el: $('#field_bugs_closed'),
            fieldID: 'bugs_closed',
            model: model
        }));



    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.DependsOnFieldView({
            el: $('#field_depends_on'),
            fieldID: 'depends_on',
            model: model
        }));





    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.TargetGroupsFieldView({
            el: $('#field_target_groups'),
            fieldID: 'target_groups',
            model: model
        }));



    reviewRequestEditorView.addFieldView(
        new RB.ReviewRequestFields.TargetPeopleFieldView({
            el: $('#field_target_people'),
            fieldID: 'target_people',
            model: model
        }));



});

				</script>


				<script type="text/javascript">
					RBCommentType.configuredTypes = ["Major", "Minor", "Info", "CG violation", "Further development"];
				</script>

</body>

</html>
`