/**
 * SSR — Location Data
 * Provides structured Indian States, Districts, and representative PIN code hubs
 * to power the sequential address selection requested:
 * State -> District -> PIN Code -> Village/Town -> House No & Street -> Landmark.
 */

export const INDIAN_LOCATIONS = {
  "Andhra Pradesh": {
    districts: [
      { name: "Guntur", samplePincodes: ["522001", "522002", "522004", "522007", "522601", "522614"] },
      { name: "Prakasam", samplePincodes: ["523001", "523002", "523155", "523225", "523316"] },
      { name: "Krishna", samplePincodes: ["520001", "520002", "520010", "521001", "521175"] },
      { name: "NTR District (Vijayawada)", samplePincodes: ["520001", "520003", "520010", "520012"] },
      { name: "Palnadu", samplePincodes: ["522601", "522615", "522616", "522619"] },
      { name: "Bapatla", samplePincodes: ["522101", "522113", "522311", "523165"] },
      { name: "Kurnool", samplePincodes: ["518001", "518002", "518003", "518004"] },
      { name: "Nandyal", samplePincodes: ["518501", "518502", "518511", "518543"] },
      { name: "Visakhapatnam", samplePincodes: ["530001", "530002", "530013", "530016", "530020"] },
      { name: "Anakapalli", samplePincodes: ["531001", "531019", "531031"] },
      { name: "East Godavari (Rajahmundry)", samplePincodes: ["533101", "533103", "533105"] },
      { name: "Kakinada", samplePincodes: ["533001", "533002", "533003"] },
      { name: "West Godavari", samplePincodes: ["534201", "534202", "534211"] },
      { name: "Eluru", samplePincodes: ["534001", "534002", "534005"] },
      { name: "Nellore (SPSR Nellore)", samplePincodes: ["524001", "524002", "524003", "524004"] },
      { name: "Tirupati", samplePincodes: ["517501", "517502", "517507"] },
      { name: "Chittoor", samplePincodes: ["517001", "517002", "517127"] },
      { name: "Ananthapuramu", samplePincodes: ["515001", "515002", "515004"] },
      { name: "Sri Sathya Sai", samplePincodes: ["515134", "515201", "515671"] },
      { name: "Kadapa (YSR District)", samplePincodes: ["516001", "516002", "516004"] },
      { name: "Annamayya", samplePincodes: ["516101", "516126", "516269"] },
      { name: "Srikakulam", samplePincodes: ["532001", "532005", "532401"] },
      { name: "Vizianagaram", samplePincodes: ["535001", "535002", "535003"] }
    ]
  },
  "Telangana": {
    districts: [
      { name: "Hyderabad", samplePincodes: ["500001", "500003", "500008", "500016", "500034", "500081"] },
      { name: "Rangareddy", samplePincodes: ["500032", "500050", "500072", "500089", "501505"] },
      { name: "Medchal-Malkajgiri", samplePincodes: ["500010", "500047", "500087", "500088"] },
      { name: "Warangal", samplePincodes: ["506001", "506002", "506007", "506009"] },
      { name: "Hanamkonda", samplePincodes: ["506001", "506004", "506015"] },
      { name: "Khammam", samplePincodes: ["507001", "507002", "507003", "507115"] },
      { name: "Bhadradri Kothagudem", samplePincodes: ["507101", "507111", "507117"] },
      { name: "Karimnagar", samplePincodes: ["505001", "505002", "505451"] },
      { name: "Nizamabad", samplePincodes: ["503001", "503002", "503003"] },
      { name: "Mahabubnagar", samplePincodes: ["509001", "509002", "509125"] },
      { name: "Nalgonda", samplePincodes: ["508001", "508002", "508213"] },
      { name: "Suryapet", samplePincodes: ["508213", "508214", "508233"] },
      { name: "Yadadri Bhuvanagiri", samplePincodes: ["508115", "508116", "508126"] },
      { name: "Siddipet", samplePincodes: ["502103", "502277", "502301"] },
      { name: "Sangareddy", samplePincodes: ["502001", "502019", "502319"] }
    ]
  },
  "Karnataka": {
    districts: [
      { name: "Bengaluru Urban", samplePincodes: ["560001", "560004", "560025", "560034", "560068", "560100"] },
      { name: "Bengaluru Rural", samplePincodes: ["562110", "562123", "562135"] },
      { name: "Mysuru", samplePincodes: ["570001", "570004", "570011", "570020"] },
      { name: "Hubballi-Dharwad", samplePincodes: ["580020", "580024", "580028"] },
      { name: "Belagavi", samplePincodes: ["590001", "590006", "590016"] },
      { name: "Ballari", samplePincodes: ["583101", "583103", "583104"] },
      { name: "Dakshina Kannada (Mangaluru)", samplePincodes: ["575001", "575003", "575006"] },
      { name: "Kalaburagi", samplePincodes: ["585101", "585102", "585103"] },
      { name: "Tumakuru", samplePincodes: ["572101", "572102", "572104"] },
      { name: "Shivamogga", samplePincodes: ["577201", "577202", "577204"] }
    ]
  },
  "Tamil Nadu": {
    districts: [
      { name: "Chennai", samplePincodes: ["600001", "600002", "600017", "600028", "600040", "600096"] },
      { name: "Coimbatore", samplePincodes: ["641001", "641002", "641012", "641018"] },
      { name: "Madurai", samplePincodes: ["625001", "625002", "625009", "625020"] },
      { name: "Salem", samplePincodes: ["636001", "636004", "636007"] },
      { name: "Tiruchirappalli", samplePincodes: ["620001", "620002", "620018"] },
      { name: "Tirunelveli", samplePincodes: ["627001", "627002", "627006"] },
      { name: "Erode", samplePincodes: ["638001", "638002", "638009"] },
      { name: "Vellore", samplePincodes: ["632001", "632004", "632009"] }
    ]
  },
  "Maharashtra": {
    districts: [
      { name: "Mumbai City", samplePincodes: ["400001", "400004", "400012", "400020"] },
      { name: "Mumbai Suburban", samplePincodes: ["400050", "400053", "400076", "400092"] },
      { name: "Pune", samplePincodes: ["411001", "411004", "411014", "411038", "411057"] },
      { name: "Thane", samplePincodes: ["400601", "400602", "400607", "400615"] },
      { name: "Nagpur", samplePincodes: ["440001", "440010", "440015", "440022"] },
      { name: "Nashik", samplePincodes: ["422001", "422005", "422009"] },
      { name: "Aurangabad (Chhatrapati Sambhajinagar)", samplePincodes: ["431001", "431003", "431005"] },
      { name: "Kolhapur", samplePincodes: ["416001", "416003", "416012"] }
    ]
  },
  "Kerala": {
    districts: [
      { name: "Ernakulam (Kochi)", samplePincodes: ["682001", "682011", "682024", "682035"] },
      { name: "Thiruvananthapuram", samplePincodes: ["695001", "695004", "695014"] },
      { name: "Kozhikode", samplePincodes: ["673001", "673004", "673016"] },
      { name: "Thrissur", samplePincodes: ["680001", "680005", "680020"] }
    ]
  },
  "Gujarat": {
    districts: [
      { name: "Ahmedabad", samplePincodes: ["380001", "380009", "380015", "380054"] },
      { name: "Surat", samplePincodes: ["395001", "395003", "395007"] },
      { name: "Vadodara", samplePincodes: ["390001", "390007", "390019"] },
      { name: "Rajkot", samplePincodes: ["360001", "360002", "360005"] }
    ]
  },
  "Delhi (NCT)": {
    districts: [
      { name: "Central Delhi", samplePincodes: ["110001", "110005", "110006"] },
      { name: "South Delhi", samplePincodes: ["110016", "110017", "110019", "110049"] },
      { name: "South West Delhi", samplePincodes: ["110021", "110037", "110075", "110077"] },
      { name: "North Delhi", samplePincodes: ["110007", "110009", "110054"] },
      { name: "East Delhi", samplePincodes: ["110091", "110092", "110095"] },
      { name: "West Delhi", samplePincodes: ["110015", "110018", "110027", "110058"] }
    ]
  },
  "Odisha": {
    districts: [
      { name: "Khordha (Bhubaneswar)", samplePincodes: ["751001", "751010", "751024"] },
      { name: "Cuttack", samplePincodes: ["753001", "753003", "753012"] },
      { name: "Ganjam", samplePincodes: ["760001", "760004", "761001"] }
    ]
  },
  "Madhya Pradesh": {
    districts: [
      { name: "Indore", samplePincodes: ["452001", "452010", "452016"] },
      { name: "Bhopal", samplePincodes: ["462001", "462003", "462016"] },
      { name: "Gwalior", samplePincodes: ["474001", "474006", "474011"] }
    ]
  },
  "Uttar Pradesh": {
    districts: [
      { name: "Lucknow", samplePincodes: ["226001", "226010", "226016"] },
      { name: "Kanpur", samplePincodes: ["208001", "208005", "208012"] },
      { name: "Gautam Buddha Nagar (Noida)", samplePincodes: ["201301", "201303", "201307"] },
      { name: "Varanasi", samplePincodes: ["221001", "221002", "221005"] }
    ]
  },
  "West Bengal": {
    districts: [
      { name: "Kolkata", samplePincodes: ["700001", "700019", "700029", "700064"] },
      { name: "North 24 Parganas", samplePincodes: ["700102", "700124", "700136"] },
      { name: "Howrah", samplePincodes: ["711101", "711102", "711106"] }
    ]
  },
  "Rajasthan": {
    districts: [
      { name: "Jaipur", samplePincodes: ["302001", "302004", "302015", "302020"] },
      { name: "Jodhpur", samplePincodes: ["342001", "342003", "342006"] },
      { name: "Udaipur", samplePincodes: ["313001", "313002", "313004"] }
    ]
  },
  "Other States / Union Territories": {
    districts: [
      { name: "Other District / Central Delivery Hub", samplePincodes: [] }
    ]
  }
};

/**
 * Returns sorted list of state names
 */
export function getStatesList() {
  return Object.keys(INDIAN_LOCATIONS);
}

/**
 * Returns districts for a given state
 */
export function getDistrictsForState(stateName) {
  if (!stateName || !INDIAN_LOCATIONS[stateName]) {
    return [];
  }
  return INDIAN_LOCATIONS[stateName].districts.map(d => d.name);
}

/**
 * Returns suggested PIN codes for a state and district
 */
export function getSamplePincodes(stateName, districtName) {
  if (!stateName || !districtName || !INDIAN_LOCATIONS[stateName]) {
    return [];
  }
  const districtObj = INDIAN_LOCATIONS[stateName].districts.find(d => d.name === districtName);
  return districtObj ? districtObj.samplePincodes : [];
}
