export function parseCommission(commission) {
  let commissionValue = "";
  let usePercentage = false;

  if (commission !== undefined && commission !== null && commission !== "") {
    const commissionStr = String(commission);
    if (commissionStr.endsWith("%")) {
      usePercentage = true;
      commissionValue = commissionStr.slice(0, -1);
    } else {
      usePercentage = false;
      commissionValue = commissionStr;
    }
  }

  return { commissionValue, usePercentage };
}

export function initializePropertyData(properties) {
  const initialData = {};

  (properties || []).forEach((property) => {
    const propertyId = property._id || property.id;
    const { commissionValue, usePercentage } = parseCommission(
      property.commission
    );

    initialData[propertyId] = {
      employeeId: property.employeeId || "",
      commission: commissionValue,
      usePercentage: usePercentage,
    };
  });

  return initialData;
}

export function formatAddress(adres) {
  if (!adres) return "No address available";

  const parts = [];
  if (adres.straat) parts.push(adres.straat);
  if (adres.huisnummer) {
    const huisnummer = adres.huisnummer;
    const num = huisnummer.hoofdnummer || "";
    const toevoeging = huisnummer.toevoeging || "";
    if (num) parts.push(`${num}${toevoeging ? ` ${toevoeging}` : ""}`);
  }
  if (adres.postcode) parts.push(adres.postcode);
  if (adres.plaats) parts.push(adres.plaats);
  if (adres.provincie) parts.push(adres.provincie);
  if (adres.land) parts.push(adres.land);

  return parts.join(", ") || "No address available";
}

export function prepareCommissionPayload(data) {
  const payload = {};

  if (data.employeeId) {
    payload.employeeId = data.employeeId;
  }

  if (
    data.commission !== undefined &&
    data.commission !== null &&
    data.commission !== ""
  ) {
    if (data.usePercentage) {
      payload.commission = `${data.commission}%`;
    } else {
      payload.commission = String(data.commission);
    }
  }

  return payload;
}
