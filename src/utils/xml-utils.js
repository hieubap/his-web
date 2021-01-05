export default {
  exportHL7(fileDataHIS, patient = {}) {
    console.log(fileDataHIS, patient);
    function download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
    // var patient = fileDataHIS?.hanhChinh || {};
    let fullName = (patient?.tenNb || "").split(" ");
    if (fullName.length > 1) {
      patient.givenName = fullName
        .filter((item, index) => {
          return index < fullName.length - 1;
        })
        .join(" ");
      patient.family = fullName[fullName.length - 1];
    }

    let xml = `<?xml version="1.0"?>
	<?xml-stylesheet type="text/xsl" href="CDA.xsl"?>
	<!--
	Readers should be aware of the evolving "Using EMR ISOFH in HL7 Version 3" implementation guide, currently in a draft state. The guide, co-developed by HL7 and the College of American Pathologists, will be balloted by HL7 as an Informative Document. Recommendations in the final published guide should usurp patterns of SNOMED CT usage found in this sample instance.
	-->
	<ClinicalDocument
		xmlns="urn:hl7-org:v3"
		xmlns:voc="urn:hl7-org:v3/voc"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:hl7-org:v3 CDA.xsd">
		<!--
	********************************************************
	CDA Header
	********************************************************
	-->
		<typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>
		<templateId root="2.16.840.1.113883.3.27.1776"/>
		<code code="18842-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tóm tắt Hồ sơ bệnh án"/>
		<title>TÓM TẮT HỒ SƠ BỆNH ÁN</title>
		<confidentialityCode code="N" codeSystem="2.16.840.1.113883.5.25"/>
		<languageCode code="vi-VN"/>
		<versionNumber value="2"/>
		<recordTarget>
			<patientRole>
				<id extension="12345" root="2.16.840.1.113883.19.5"/>
				<id extension="12345" root="2.16.840.1.113883.19.5"/>
				<patient>
					<name>
						<given>${patient?.givenName}</given>
						<family>${patient?.family}</family>
						<suffix></suffix>
					</name>
					<administrativeGenderCode code="${
			(fileDataHIS?.gioiTinh || [])[0] === "1" ? "M" : "F"
		  }" codeSystem="2.16.840.1.113883.5.1"/>
					<birthTime value="${(patient?.ngaySinh
			? new Date(patient?.ngaySinh)
			: new Date()
		  ).format("yyyyMMdd")}"/>
				</patient>
				<providerOrganization>
					<id root="2.16.840.1.113883.19.5"/>
				</providerOrganization>
			</patientRole>
		</recordTarget>		
		<custodian>
			<assignedCustodian>
				<representedCustodianOrganization>
					<id root="2.16.840.1.113883.19.5"/>
					<name>${fileDataHIS?.tieuDeTrai2}</name>
				</representedCustodianOrganization>
			</assignedCustodian>
		</custodian>		
		<relatedDocument typeCode="RPLC">
			<parentDocument>
				<id extension="a123" root="2.16.840.1.113883.19.4"/>
				<setId extension="BB35" root="2.16.840.1.113883.19.7"/>
				<versionNumber value="1"/>
			</parentDocument>
		</relatedDocument>
		<componentOf>
			<encompassingEncounter>				
				<location>
					<healthCareFacility classCode="DSDLOC">
						<code code="GIM" codeSystem="2.16.840.1.113883.5.10588" displayName="Khoa Mắt (B7)"/>
					</healthCareFacility>
				</location>
			</encompassingEncounter>
		</componentOf>
		<!--
	********************************************************
	CDA Body
	********************************************************
	-->
		<component>
			<structuredBody>
				<!--
	********************************************************
	Bệnh sử
	********************************************************
	-->
				<component>
					<section>
						<code code="10164-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="EMR ISOFH"/>
						<title>a) Quá trình bệnh lý và diễn biến lâm sàng:</title>
						<text>
							<content>${fileDataHIS?.quaTrinhBenhLyVaDienBienCanLamSang}</content>
						</text>
					</section>
				</component>
				<!--
	********************************************************
	Tiền sử bệnh
	********************************************************
	-->
				<component>
					<section>
						<code code="10153-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="EMR ISOFH"/>
						<title>b) Tiền sử: </title>
						<text>
							<list>
								<item>
									<content ID="a1">${fileDataHIS?.tienSu}</content>
								</item>
							</list>
						</text>
						<entry>
							<observation classCode="COND" moodCode="EVN">
								<code code="195967001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="EMR ISOFH" displayName="${fileDataHIS?.tienSu}">
									<originalText>
										<reference value="#a1"/>
									</originalText>
								</code>
								<statusCode code="completed"/>
								<effectiveTime value="1950"/>
								<reference typeCode="XCRPT">
									<externalObservation>
										<id root="2.16.840.1.113883.19.1.2765"/>
									</externalObservation>
								</reference>
							</observation>
						</entry>						
					</section>
				</component>
				<!--
	********************************************************
	Kết quả Cận lâm sàng
	********************************************************
	-->
				<component>
					<section>
						<code code="11502-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC"/>
						<title>c) Tóm tắt kết quả cận lâm sàng có giá trị chẩn đoán:  </title>
						<text>
							<list>
								<item>${fileDataHIS?.tomTatKetQuaCls}</item>
								<item></item>
							</list>
						</text>
						<entry>
							<observation classCode="OBS" moodCode="EVN">
								<id root="2.16.840.1.113883.19.1.7005"/>
								<code code="313193002" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Peak flow"/>
								<statusCode code="completed"/>
								<effectiveTime value="20000407"/>
								<value xsi:type="RTO_PQ_PQ">
									<numerator value="260" unit="l"/>
									<denominator value="1" unit="min"/>
								</value>
							</observation>
						</entry>
					</section>
				</component>
				<!--
	********************************************************
	Phương pháp điều trị
	********************************************************
	-->
				<component>
					<section>
						<templateId root="2.16.840.1.113883.3.27.354"/>
						<code code="18776-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC"/>
						<title>d) Phương pháp Điều trị: </title>
						<text>
							<list>
								<item>${fileDataHIS?.phuongPhapDieuTri} </item>
							</list>
						</text>
						<entry>
							<act classCode="ACT" moodCode="INT">
								<id/>
								<code code="23426006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Pulmonary function test"/>
								<text> PFTs.</text>
								<entryRelationship typeCode="COMP">
									<act classCode="ACT" moodCode="INT">
										<code code="252472004" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Lung volume test"/>
									</act>
								</entryRelationship>
							</act>
						</entry>						
					</section>
				</component>
				<!--		
	********************************************************
	Kết luận
	********************************************************
	-->
				<component>
					<section>
						<code code="11496-7" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC"/>
						<title>e) Tình trạng người bệnh ra viện:</title>
						<text>
							<list>
								<item>${fileDataHIS?.tinhTrangNb}</item>
							</list>
						</text>
						<entry>
							<observation classCode="COND" moodCode="EVN">
								<code code="14657009" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Established diagnosis"/>
								<statusCode code="completed"/>
								<effectiveTime value="200004071530"/>
								<value xsi:type="CD" code="195967001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Asthma">
									<translation code="49390" codeSystem="2.16.840.1.113883.6.2" codeSystemName="ICD9CM" displayName="ASTHMA W/O STATUS ASTHMATICUS"/>
								</value>
								<reference typeCode="ELNK">
									<externalObservation classCode="COND">
										<id root="2.16.840.1.113883.19.1.35"/>
									</externalObservation>
								</reference>
							</observation>
						</entry>					
					</section>
				</component>
			</structuredBody>
		</component>
	</ClinicalDocument>`;
    download("hl7cda.xml", xml);
  },
};
  