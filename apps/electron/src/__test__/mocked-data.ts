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