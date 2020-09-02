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

export const DIFF_CONTENT = `
Index: test/sct/testcases/Rumag/FhsSetDataTime.ttcn3
===================================================================
--- test/sct/testcases/Rumag/FhsSetDataTime.ttcn3	(nonexistent)
+++ test/sct/testcases/Rumag/FhsSetDataTime.ttcn3	(working copy)
@@ -0,0 +1,70 @@
+/**
+ *  FHS module removal test
+ *
+ * @author Luke Wu
+ * @reviewer
+ * @since 2020-06-13
+ * @tags [MOAM] [SCT] [REL4] [WMP] [RUMAG] [FHS] [RUMAGRP1]
+ * @feature LTE3338
+ * @use_case RMgmtRP1_UtcTimeDeliverytoRMthroughRP1msg
+ * @acceptance_criteria N/A
+ * @pronto PR521655
+ *
+ * Copyright 2020 Nokia Solutions and Networks. All rights reserved.
+ */
+
+module FhsSetDataTime
+{
+    import from MEnvironment                 all;
+    import from BTS_ASIA_MDEA                all;
+    import from MBtsomMtc                    all;
+    import from MBtsomMtcFunctions           all;
+    import from MBtsomTestSystemRel4         all;
+    import from MBm                          all;
+    import from MLogger                      all;
+    import from RumagCommon                  all;
+    import from FhsTestsCommon               all;
+    import from DistnamesModule              all;
+    import from protoObjects                 all;
+    import from MBmImExpectations            all;
+    import from RumagCommonFunctions         all;
+
+    function sendSetDateTime() runs on CBm {
+        MBm.init();
+
+        log(PRINT_INFO, "TC flow: sending oper_setDateTime()");
+
+        var Object fhsuObject := MBm.getObject(FHSU_L);
+        fhsuObject.object.fhsu_l.oper_setDateTime:= {};
+
+        triggerInternalObjectExecute(fhsuObject);
+        log(PRINT_DEBUG, "TC flow: FHSU_L::oper_setDateTime executed.");
+
+        executeAndServerResult(fhsuObject);
+
+        log(PRINT_DEBUG, "TC flow: sendSetDateTime completed");
+
+        setverdict(pass);
+
+        atBmStop();
+    }
+
+    testcase testOperSetDateTime() runs on CBtsomMtc system CBtsomTestSystemRel4
+    {
+        startTest(BTS_ASIA_MDEA.createConfiguration(), EL3Protocol_CPRI_RP1);
+
+        bm.start(sendSetDateTime());
+        bm.done;
+
+        MBtsomMtcFunctions.tearDownDefaultTestcase();
+        setverdict(pass);
+    }
+
+    control
+    {
+        log(PRINT_DEBUG, "TC flow 1: FHSU_L MO has been created.");
+        log(PRINT_DEBUG, "TC flow 2: FHSU_L MO has been enabled.");
+        log(PRINT_DEBUG, "TC flow 3: FHSU_L::oper_setDateTime executed.");
+        execute (testOperSetDateTime(), TC_TIME * getTcMultiplier());
+    }
+}
Index: SC_MONOLITH/DM_RUMAG/src/static/Rp1Agent/RadioAgent.cpp
===================================================================
--- SC_MONOLITH/DM_RUMAG/src/static/Rp1Agent/RadioAgent.cpp	(revision 180639)
+++ SC_MONOLITH/DM_RUMAG/src/static/Rp1Agent/RadioAgent.cpp	(working copy)
@@ -2940,7 +2940,9 @@
 {
     logger_ << info << __FUNCTION__;
 
-    if ( agentContext_->isRadioCpri and agentContext_->radioStartup and not agentContext_->radioStartup->getIsStartupUndergoing() )
+    if (  agentContext_->radioStartup
+          and not agentContext_->radioStartup->getIsStartupUndergoing()
+          and (agentContext_->isRadioCpri or agentContext_->isFhs) )
     {
         agentContext_->radioStartup->collectDateTime();
     }
Index: SC_MONOLITH/DM_RUMAG/src/static/LimModule/Executors/FhsuExecutor.cpp
===================================================================
--- SC_MONOLITH/DM_RUMAG/src/static/LimModule/Executors/FhsuExecutor.cpp	(revision 180639)
+++ SC_MONOLITH/DM_RUMAG/src/static/LimModule/Executors/FhsuExecutor.cpp	(working copy)
@@ -1,30 +1,31 @@
-/**
- * Copyright 2018 Nokia. All rights reserved.
- **/
-
-#include "LimModule/Executors/FhsuExecutor.hpp"
-
-#include "RadioEquipment/RadioEquipmentController.h"
-#include "Rp1Agent/RadioAgent.hpp"
-#include "DBFacade/Functors.hpp"
-
-namespace rum
-{
-namespace lm
-{
-
-FhsuExecutor::FhsuExecutor(boost::shared_ptr<RadioEquipment::MultiradioAgentContext> agentContext)
-    : agentContext_(agentContext)
-    , lim_(agentContext->lim_)
-    , logger_(agentContext->logger + " FhsuExecutor")
-{
-    logger_ << debug << __FUNCTION__ << "(): Register executor of "
-        << agentContext_->moduleDistName.getString();
-}
-
-lim::EExecutionStatus FhsuExecutor::execute(
-    lim::MoFhsu_lPtr object, const lim::FHSU_L::DeleteObject& operation)
+/**
+ * Copyright 2018 Nokia. All rights reserved.
+ **/
+
+#include "LimModule/Executors/FhsuExecutor.hpp"
+
+#include "Rp1Agent/RadioStartup.hpp"
+#include "RadioEquipment/RadioEquipmentController.h"
+#include "Rp1Agent/RadioAgent.hpp"
+#include "DBFacade/Functors.hpp"
+
+namespace rum
 {
+namespace lm
+{
+
+FhsuExecutor::FhsuExecutor(boost::shared_ptr<RadioEquipment::MultiradioAgentContext> agentContext)
+    : agentContext_(agentContext)
+    , lim_(agentContext->lim_)
+    , logger_(agentContext->logger + " FhsuExecutor")
+{
+    logger_ << debug << __FUNCTION__ << "(): Register executor of "
+        << agentContext_->moduleDistName.getString();
+}
+
+lim::EExecutionStatus FhsuExecutor::execute(
+    lim::MoFhsu_lPtr object, const lim::FHSU_L::DeleteObject& operation)
+{
     if (agentContext_->radioEquipmentController->isAgentActive(agentContext_->moduleDistName))
     {
         if ( auto radioAgent = agentContext_->radioAgent.lock() )
@@ -34,44 +35,61 @@
     }
     else
     {
-        deleteFhsuHwLinks();
-        lim_->remove(object->getDistName());
-    }
-
-    logger_ << info << __FUNCTION__ << "(DeleteObject): delete FHSU_L Executed";
-    return lim::EExecutionStatus_Executed;
-}
-
-void FhsuExecutor::deleteFhsuHwLinks()
-{
-    auto hwLinks = lim_->fetchAll<lim::MoHwlink_l>(
-        [&](const lim::MoHwlink_l& mo) -> bool
-        {
-            const auto& moduleDn = agentContext_->moduleDistName;
-            return mo.getDistName().getParent() == moduleDn
-                and (mo->destinationDistName.find(moduleDn.getString()) != std::string::npos
-                or mo->sourceDistName.find(moduleDn.getString()) != std::string::npos);
-        });
-
-    for (const auto& hwLink : hwLinks)
-    {
-        lim_->remove(hwLink->getDistName());
-    }
-}
-
-lim::EExecutionStatus FhsuExecutor::execute(
-    lim::MoFhsu_lPtr object, const lim::FHSU_L::SetReasoningStatus& operation)
-{
-    lim::MoFhsu_l& fhsu = *(agentContext_->fhsu);
-    RadioEquipment::addReasoningStatusIfNotPresent(fhsu,
-        lim::FHSU_L::StateInfo::EReasoningStatus_UnitUnauthorized);
-    fhsu->stateInfo.availabilityStatus = lim::FHSU_L::StateInfo::EAvailabilityStatus_Failed;
-    fhsu->stateInfo.hardwareStatus = lim::FHSU_L::StateInfo::EHardwareStatus_Detected;
-
-    lim_->update(agentContext_->fhsu);
-    logger_ << info << __FUNCTION__ << "(SetReasoningStatus): Executed";
-    return lim::EExecutionStatus_Executed;
-}
-
-}  // namespace lm
-}  // namespace rum
\ No newline at end of file
+        deleteFhsuHwLinks();
+        lim_->remove(object->getDistName());
+    }
+
+    logger_ << info << __FUNCTION__ << "(DeleteObject): delete FHSU_L Executed";
+    return lim::EExecutionStatus_Executed;
+}
+
+void FhsuExecutor::deleteFhsuHwLinks()
+{
+    auto hwLinks = lim_->fetchAll<lim::MoHwlink_l>(
+        [&](const lim::MoHwlink_l& mo) -> bool
+        {
+            const auto& moduleDn = agentContext_->moduleDistName;
+            return mo.getDistName().getParent() == moduleDn
+                and (mo->destinationDistName.find(moduleDn.getString()) != std::string::npos
+                or mo->sourceDistName.find(moduleDn.getString()) != std::string::npos);
+        });
+
+    for (const auto& hwLink : hwLinks)
+    {
+        lim_->remove(hwLink->getDistName());
+    }
+}
+
+lim::EExecutionStatus FhsuExecutor::execute(
+    lim::MoFhsu_lPtr object, const lim::FHSU_L::SetReasoningStatus& operation)
+{
+    lim::MoFhsu_l& fhsu = *(agentContext_->fhsu);
+    RadioEquipment::addReasoningStatusIfNotPresent(fhsu,
+        lim::FHSU_L::StateInfo::EReasoningStatus_UnitUnauthorized);
+    fhsu->stateInfo.availabilityStatus = lim::FHSU_L::StateInfo::EAvailabilityStatus_Failed;
+    fhsu->stateInfo.hardwareStatus = lim::FHSU_L::StateInfo::EHardwareStatus_Detected;
+
+    lim_->update(agentContext_->fhsu);
+    logger_ << info << __FUNCTION__ << "(SetReasoningStatus): Executed";
+    return lim::EExecutionStatus_Executed;
+}
+
+lim::EExecutionStatus FhsuExecutor::execute(
+    lim::MoFhsu_lPtr object, const lim::FHSU_L::SetDateTime& operation)
+{
+    if (agentContext_->radioEquipmentController->isAgentActive(agentContext_->moduleDistName))
+    {
+        if ( auto radioAgent = agentContext_->radioAgent.lock() )
+        {
+            radioAgent->setDateTime();
+        }
+    } else {
+        logger_ << error << __FUNCTION__ << " Agent is not active";
+    }
+
+    logger_ << info << __FUNCTION__ << "(SetDateTime): Executed";
+    return lim::EExecutionStatus_Executed;
+}
+
+}  // namespace lm
+}  // namespace rum
Index: SC_MONOLITH/DM_RUMAG/src/include/Rp1Agent/RadioAgent.hpp
===================================================================
--- SC_MONOLITH/DM_RUMAG/src/include/Rp1Agent/RadioAgent.hpp	(revision 180639)
+++ SC_MONOLITH/DM_RUMAG/src/include/Rp1Agent/RadioAgent.hpp	(working copy)
@@ -106,6 +106,7 @@
     void opSendCablnkCapacity( std::string const & portNumber, std::string const & capacity, bool createVolatileNeeded );
 
     void deleteObject(std::string const & serviceDnString = std::string{});
+    void setDateTime();
     void configureFhsEth(std::string const & reqDn);
     void processFhsConfigureEth();
     void teardown( ETermination terminationReason );
@@ -207,7 +208,6 @@
     void handleSfpTestTaskCreation( const lim::DistName& dn );
     void handleSfpTestTask( const lim::DistName& dn );
     void handleSfpTestCreation( const lim::DistName& dn );
-    void setDateTime();
     void configurePowerMeterMeasurement();
     void subscribePowerMeterMeasurementUserConf();
     void handlePowerMeterMeasurementUserConf( const lim::DistName& distName );
Index: SC_MONOLITH/DM_RUMAG/src/include/LimModule/Executors/FhsuExecutor.hpp
===================================================================
--- SC_MONOLITH/DM_RUMAG/src/include/LimModule/Executors/FhsuExecutor.hpp	(revision 180639)
+++ SC_MONOLITH/DM_RUMAG/src/include/LimModule/Executors/FhsuExecutor.hpp	(working copy)
@@ -25,6 +25,8 @@
         const lim::FHSU_L::DeleteObject& operation);
     lim::EExecutionStatus execute(lim::MoFhsu_lPtr object,
         const lim::FHSU_L::SetReasoningStatus& operation);
+    lim::EExecutionStatus execute(lim::MoFhsu_lPtr object,
+        const lim::FHSU_L::SetDateTime& operation);
 
 private:
     void deleteFhsuHwLinks();

`


