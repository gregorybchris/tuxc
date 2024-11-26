import { RunMap } from "@/app/lib/models/runMap";

import MAP_09_RED_LINE from "./jpx/09-red-line.json";
// import MAP_1500_METER_POND_SHORT from "./jpx/1500-meter-pond-short.json";
import MAP_1500_METER_POND from "./jpx/1500-meter-pond.json";
// import MAP_2_CENTRAL from "./jpx/2-central.json";
import MAP_6_MILE_BIKE_PATH from "./jpx/6-mile-bike-path.json";
import MAP_96_STRAIGHT_STREET from "./jpx/96-straight-street.json";
import MAP_ALEWIFE_GREENWAY from "./jpx/alewife-greenway.json";
import MAP_AQUARIUM from "./jpx/aquarium.json";
import MAP_ARBORETUM_X_JP from "./jpx/arboretum-x-jp.json";
import MAP_ARLINGTON_TO_ALEWIFE from "./jpx/arlington-to-alewife.json";
import MAP_AROUND_THE_FELLS from "./jpx/around-the-fells.json";
import MAP_ASS_CANYON from "./jpx/ass-canyon.json";
import MAP_BATTLE_ROAD from "./jpx/battle-road.json";
import MAP_BBB from "./jpx/bbb.json";
// import MAP_BC_RES from "./jpx/bc-res.json";
import MAP_BELMONT_HILL from "./jpx/belmont-hill.json";
import MAP_BELMONT from "./jpx/belmont.json";
import MAP_BERNIES_GREAT_MEADOW from "./jpx/bernies-great-meadow.json";
// import MAP_BFL from "./jpx/bfl.json";
// import MAP_BIKE_LAKES from "./jpx/bike-lakes.json";
import MAP_BOAT_HOUSE from "./jpx/boat-house.json";
// import MAP_BOSTON_MASSACRE from "./jpx/boston-massacre.json";
// import MAP_BOSTON_TOUR from "./jpx/boston-tour.json";
import MAP_BRATTLE_STREET from "./jpx/brattle-street.json";
import MAP_BROADWASH from "./jpx/broadwash.json";
import MAP_BROOKS_ESTATE from "./jpx/brooks-estate.json";
import MAP_BU_BRIDGE_FAKE_10 from "./jpx/bu-bridge-fake-10.json";
import MAP_BUNKER_HILL from "./jpx/bunker-hill.json";
import MAP_C_LOOP from "./jpx/c-loop.json";
import MAP_CASTLE_BLACK from "./jpx/castle-black.json";
import MAP_CEMETERY from "./jpx/cemetery.json";
// import MAP_CHARLES_NINE_MILER from "./jpx/charles-nine-miler.json";
// import MAP_CHARLES_ST from "./jpx/charles-st.json";
import MAP_CHIPS from "./jpx/chips.json";
import MAP_CHRIS_DADS_HOUSE from "./jpx/chris-dads-house.json";
// import MAP_DEA_POND from "./jpx/dea-pond.json";
import MAP_DO_IT_LIVE from "./jpx/do-it-live.json";
// import MAP_DONUT_RUN_DELUXE from "./jpx/donut-run-deluxe.json";
// import MAP_DOUBLE_MID_RES from "./jpx/double-mid-res.json";
import MAP_ENCORE from "./jpx/encore.json";
import MAP_ENFORCER from "./jpx/enforcer.json";
// import MAP_EX_BFL from "./jpx/ex-bfl.json";
import MAP_EXTENDED_CEMETERY from "./jpx/extended-cemetery.json";
import MAP_EXTENDED_CHIPS from "./jpx/extended-chips.json";
import MAP_EXTENDED_HARVARD from "./jpx/extended-harvard.json";
import MAP_EXTENDEDLY_SHORT_GLAM from "./jpx/extendedly-short-glam.json";
import MAP_EXTENDEDLY_SHORTER_GLAM from "./jpx/extendedly-shorter-glam.json";
// import MAP_EXTRA_SHORT_FREEDOM_TRAIL from "./jpx/extra-short-freedom-trail.json";
import MAP_FAR_TOWER_TO_FIREHOUSE from "./jpx/far-tower-to-firehouse.json";
import MAP_FAR_TOWER from "./jpx/far-tower.json";
// import MAP_FELLS_N_CHIPS from "./jpx/fells-n-chips.json";
import MAP_FELLSWAY from "./jpx/fellsway.json";
// import MAP_FEMEPOND_CHARLES_BFL from "./jpx/femepond-charles-bfl.json";
import MAP_FEMETERY from "./jpx/femetery.json";
import MAP_FEMMED from "./jpx/femmed.json";
import MAP_FENWAY from "./jpx/fenway.json";
import MAP_FIREHOUSE from "./jpx/firehouse.json";
// import MAP_FREEDOM_TRAIL_EXTENDED from "./jpx/freedom-trail-extended.json";
// import MAP_FREEDOM_TRAIL_SHORT from "./jpx/freedom-trail-short.json";
import MAP_FREEDOM_TRAIL from "./jpx/freedom-trail.json";
import MAP_FRESH_POND from "./jpx/fresh-pond.json";
import MAP_FRIES from "./jpx/fries.json";
import MAP_FULL_GLAM from "./jpx/full-glam.json";
import MAP_FUMRD from "./jpx/fumrd.json";
import MAP_GC from "./jpx/gc.json";
import MAP_GEORGE_STREET from "./jpx/george-street.json";
import MAP_GLAMOURVILLE from "./jpx/glamourville.json";
import MAP_GOLDILOCKS from "./jpx/goldilocks.json";
import MAP_GOLDMAN_SACHS from "./jpx/goldman-sachs.json";
import MAP_GOOCH_PLAYGROUND from "./jpx/gooch-playground.json";
import MAP_GREENWAY from "./jpx/greenway.json";
import MAP_HABITAT from "./jpx/habitat.json";
import MAP_HARVARD from "./jpx/harvard.json";
import MAP_HB from "./jpx/hb.json";
import MAP_HOOVER_SUCKS from "./jpx/hoover-sucks.json";
import MAP_HORN_POND from "./jpx/horn-pond.json";
import MAP_JP from "./jpx/jp.json";
import MAP_K_HARVARD from "./jpx/k-harvard.json";
import MAP_LAKES from "./jpx/lakes.json";
import MAP_LOGAN_FERRY from "./jpx/logan-ferry.json";
import MAP_LONG_LAKES from "./jpx/long-lakes.json";
// import MAP_LONG_RES_TO_LONG_LAKES from "./jpx/long-res-to-long-lakes.json";
import MAP_LONG_RES_TO_WINCHESTER_HOSPITAL from "./jpx/long-res-to-winchester-hospital.json";
import MAP_LONG_RES from "./jpx/long-res.json";
import MAP_LONGFELLOW from "./jpx/longfellow.json";
import MAP_MAIN_STREET from "./jpx/main-street.json";
import MAP_MALDEN from "./jpx/malden.json";
// import MAP_MARATHON_MONDAY from "./jpx/marathon-monday.json";
import MAP_MARVELS_D from "./jpx/marvels-d.json";
import MAP_MED_SQUARE from "./jpx/med-square.json";
import MAP_MENOTOMY_TO_BELMONT from "./jpx/menotomy-to-belmont.json";
// import MAP_MENOTOMY from "./jpx/menotomy.json";
import MAP_MET_STATE from "./jpx/met-state.json";
// import MAP_MID_D_MADNESS from "./jpx/mid-d-madness.json";
import MAP_MID_RES from "./jpx/mid-res.json";
import MAP_MOMS_RUN from "./jpx/moms-run.json";
// import MAP_MUSEUM_OF_SCIENCE from "./jpx/museum-of-science.json";
import MAP_MYSTIC_STOPLIGHT_COOLDOWN from "./jpx/mystic-stoplight-cooldown.json";
import MAP_NEAR_TOWER from "./jpx/near-tower.json";
import MAP_NEW_BUNKER_HILL from "./jpx/new-bunker-hill.json";
import MAP_NO_FELLS from "./jpx/no-fells.json";
import MAP_NO_HILL from "./jpx/no-hill.json";
import MAP_NO_RES from "./jpx/no-res.json";
// import MAP_NO_WHIP from "./jpx/no-whip.json";
import MAP_NORTH_STREET from "./jpx/north-street.json";
import MAP_OG_NO_FELLS from "./jpx/og-no-fells.json";
import MAP_OG_NO_HILL from "./jpx/og-no-hill.json";
import MAP_OGSB from "./jpx/ogsb.json";
import MAP_ONE_BRIDGE from "./jpx/one-bridge.json";
import MAP_PISGAH from "./jpx/pisgah.json";
import MAP_PORTER from "./jpx/porter.json";
import MAP_POWDER_TEELE from "./jpx/powder-teele.json";
import MAP_PRESIDENTS_RUN from "./jpx/presidents-run.json";
// import MAP_PURPLE_PEOPLE_EATER from "./jpx/purple-people-eater.json";
import MAP_RAILROAD_UNDERPASS from "./jpx/railroad-underpass.json";
import MAP_RECTANGLE from "./jpx/rectangle.json";
import MAP_RUBI_FACTORY from "./jpx/rubi-factory.json";
import MAP_S_BIASED from "./jpx/s-biased.json";
// import MAP_SANDY_BEACH from "./jpx/sandy-beach.json";
import MAP_SAUDI_PRINCE from "./jpx/saudi-prince.json";
import MAP_SHAKER from "./jpx/shaker.json";
// import MAP_SHORT_FENWAY from "./jpx/short-fenway.json";
import MAP_SHORT_GLAM from "./jpx/short-glam.json";
// import MAP_SHORT_RES_TO_BU_BRIDGE from "./jpx/short-res-to-bu-bridge.json";
import MAP_SHORT_RES from "./jpx/short-res.json";
import MAP_SHORT_SB from "./jpx/short-sb.json";
import MAP_SKELETON_OVERLOOK from "./jpx/skeleton-overlook.json";
import MAP_SMOOTS from "./jpx/smoots.json";
import MAP_SON_OF_A_BEACH from "./jpx/son-of-a-beach.json";
import MAP_SOUTH_BORDER_ROAD from "./jpx/south-border-road.json";
import MAP_SOUTH_OF_THE_BORDER from "./jpx/south-of-the-border.json";
import MAP_SPY_POND from "./jpx/spy-pond.json";
import MAP_SQUARES from "./jpx/squares.json";
import MAP_SWIMMING_HOLE from "./jpx/swimming-hole.json";
import MAP_SY_SNOOTLES from "./jpx/sy-snootles.json";
import MAP_TAYLORS_STUPID_RUN from "./jpx/taylors-stupid-run.json";
import MAP_THE_HIGHLANDS from "./jpx/the-highlands.json";
import MAP_TOUR_DE_CAMBRVILLE_BRICKS from "./jpx/tour-de-cambrville-bricks.json";
import MAP_TOUR_DE_MALDEN from "./jpx/tour-de-malden.json";
import MAP_TOWNIE_PORN from "./jpx/townie-porn.json";
// import MAP_TRIPLE_PEAKS from "./jpx/triple-peaks.json";
import MAP_TRUNKS from "./jpx/trunks.json";
// import MAP_TWIN_PEAKS from "./jpx/twin-peaks.json";
import MAP_TWO_BRIDGES from "./jpx/two-bridges.json";
import MAP_VIKING_TOWER from "./jpx/viking-tower.json";
import MAP_WEST_CAMBRIDGE from "./jpx/west-cambridge.json";
import MAP_WEST_LAKES from "./jpx/west-lakes.json";
import MAP_WEST_MED from "./jpx/west-med.json";
import MAP_WILSON_FARM from "./jpx/wilson-farm.json";
// import MAP_WINCHESTER_HOSPITAL from "./jpx/winchester-hospital.json";
import MAP_WOODBINE_WIGGLE from "./jpx/woodbine-wiggle.json";
import MAP_X_C_LOOP from "./jpx/x-c-loop.json";
import MAP_X_NO_HILL from "./jpx/x-no-hill.json";
// import MAP_YERXA from "./jpx/yerxa.json";
import MAP_ZERO_FELLS from "./jpx/zero-fells.json";

export const MAPS = new Map<string, RunMap>([
  ["09-red-line", MAP_09_RED_LINE],
  // ["1500-meter-pond-short", MAP_1500_METER_POND_SHORT],
  ["1500-meter-pond", MAP_1500_METER_POND],
  // ["2-central", MAP_2_CENTRAL],
  ["6-mile-bike-path", MAP_6_MILE_BIKE_PATH],
  ["96-straight-street", MAP_96_STRAIGHT_STREET],
  ["alewife-greenway", MAP_ALEWIFE_GREENWAY],
  ["aquarium", MAP_AQUARIUM],
  ["arboretum-x-jp", MAP_ARBORETUM_X_JP],
  ["arlington-to-alewife", MAP_ARLINGTON_TO_ALEWIFE],
  ["around-the-fells", MAP_AROUND_THE_FELLS],
  ["ass-canyon", MAP_ASS_CANYON],
  ["battle-road", MAP_BATTLE_ROAD],
  ["bbb", MAP_BBB],
  // ["bc-res", MAP_BC_RES],
  ["belmont-hill", MAP_BELMONT_HILL],
  ["belmont", MAP_BELMONT],
  ["bernies-great-meadow", MAP_BERNIES_GREAT_MEADOW],
  // ["bfl", MAP_BFL],
  // ["bike-lakes", MAP_BIKE_LAKES],
  ["boat-house", MAP_BOAT_HOUSE],
  // ["boston-massacre", MAP_BOSTON_MASSACRE],
  // ["boston-tour", MAP_BOSTON_TOUR],
  ["brattle-street", MAP_BRATTLE_STREET],
  ["broadwash", MAP_BROADWASH],
  ["brooks-estate", MAP_BROOKS_ESTATE],
  ["bu-bridge-fake-10", MAP_BU_BRIDGE_FAKE_10],
  ["bunker-hill", MAP_BUNKER_HILL],
  ["c-loop", MAP_C_LOOP],
  ["castle-black", MAP_CASTLE_BLACK],
  ["cemetery", MAP_CEMETERY],
  // ["charles-nine-miler", MAP_CHARLES_NINE_MILER],
  // ["charles-st", MAP_CHARLES_ST],
  ["chips", MAP_CHIPS],
  ["chris-dads-house", MAP_CHRIS_DADS_HOUSE],
  // ["dea-pond", MAP_DEA_POND],
  ["do-it-live", MAP_DO_IT_LIVE],
  // ["donut-run-deluxe", MAP_DONUT_RUN_DELUXE],
  // ["double-mid-res", MAP_DOUBLE_MID_RES],
  ["encore", MAP_ENCORE],
  ["enforcer", MAP_ENFORCER],
  // ["ex-bfl", MAP_EX_BFL],
  ["extended-cemetery", MAP_EXTENDED_CEMETERY],
  ["extended-chips", MAP_EXTENDED_CHIPS],
  ["extended-harvard", MAP_EXTENDED_HARVARD],
  ["extendedly-short-glam", MAP_EXTENDEDLY_SHORT_GLAM],
  ["extendedly-shorter-glam", MAP_EXTENDEDLY_SHORTER_GLAM],
  // ["extra-short-freedom-trail", MAP_EXTRA_SHORT_FREEDOM_TRAIL],
  ["far-tower-to-firehouse", MAP_FAR_TOWER_TO_FIREHOUSE],
  ["far-tower", MAP_FAR_TOWER],
  // ["fells-n-chips", MAP_FELLS_N_CHIPS],
  ["fellsway", MAP_FELLSWAY],
  // ["femepond-charles-bfl", MAP_FEMEPOND_CHARLES_BFL],
  ["femetery", MAP_FEMETERY],
  ["femmed", MAP_FEMMED],
  ["fenway", MAP_FENWAY],
  ["firehouse", MAP_FIREHOUSE],
  // ["freedom-trail-extended", MAP_FREEDOM_TRAIL_EXTENDED],
  // ["freedom-trail-short", MAP_FREEDOM_TRAIL_SHORT],
  ["freedom-trail", MAP_FREEDOM_TRAIL],
  ["fresh-pond", MAP_FRESH_POND],
  ["fries", MAP_FRIES],
  ["full-glam", MAP_FULL_GLAM],
  ["fumrd", MAP_FUMRD],
  ["gc", MAP_GC],
  ["george-street", MAP_GEORGE_STREET],
  ["glamourville", MAP_GLAMOURVILLE],
  ["goldilocks", MAP_GOLDILOCKS],
  ["goldman-sachs", MAP_GOLDMAN_SACHS],
  ["gooch-playground", MAP_GOOCH_PLAYGROUND],
  ["greenway", MAP_GREENWAY],
  ["habitat", MAP_HABITAT],
  ["harvard", MAP_HARVARD],
  ["hb", MAP_HB],
  ["hoover-sucks", MAP_HOOVER_SUCKS],
  ["horn-pond", MAP_HORN_POND],
  ["jp", MAP_JP],
  ["k-harvard", MAP_K_HARVARD],
  ["lakes", MAP_LAKES],
  ["logan-ferry", MAP_LOGAN_FERRY],
  ["long-lakes", MAP_LONG_LAKES],
  // ["long-res-to-long-lakes", MAP_LONG_RES_TO_LONG_LAKES],
  ["long-res-to-winchester-hospital", MAP_LONG_RES_TO_WINCHESTER_HOSPITAL],
  ["long-res", MAP_LONG_RES],
  ["longfellow", MAP_LONGFELLOW],
  ["main-street", MAP_MAIN_STREET],
  ["malden", MAP_MALDEN],
  // ["marathon-monday", MAP_MARATHON_MONDAY],
  ["marvels-d", MAP_MARVELS_D],
  ["med-square", MAP_MED_SQUARE],
  ["menotomy-to-belmont", MAP_MENOTOMY_TO_BELMONT],
  // ["menotomy", MAP_MENOTOMY],
  ["met-state", MAP_MET_STATE],
  // ["mid-d-madness", MAP_MID_D_MADNESS],
  ["mid-res", MAP_MID_RES],
  ["moms-run", MAP_MOMS_RUN],
  // ["museum-of-science", MAP_MUSEUM_OF_SCIENCE],
  ["mystic-stoplight-cooldown", MAP_MYSTIC_STOPLIGHT_COOLDOWN],
  ["near-tower", MAP_NEAR_TOWER],
  ["new-bunker-hill", MAP_NEW_BUNKER_HILL],
  ["no-fells", MAP_NO_FELLS],
  ["no-hill", MAP_NO_HILL],
  ["no-res", MAP_NO_RES],
  // ["no-whip", MAP_NO_WHIP],
  ["north-street", MAP_NORTH_STREET],
  ["og-no-fells", MAP_OG_NO_FELLS],
  ["og-no-hill", MAP_OG_NO_HILL],
  ["ogsb", MAP_OGSB],
  ["one-bridge", MAP_ONE_BRIDGE],
  ["pisgah", MAP_PISGAH],
  ["porter", MAP_PORTER],
  ["powder-teele", MAP_POWDER_TEELE],
  ["presidents-run", MAP_PRESIDENTS_RUN],
  // ["purple-people-eater", MAP_PURPLE_PEOPLE_EATER],
  ["railroad-underpass", MAP_RAILROAD_UNDERPASS],
  ["rectangle", MAP_RECTANGLE],
  ["rubi-factory", MAP_RUBI_FACTORY],
  ["s-biased", MAP_S_BIASED],
  // ["sandy-beach", MAP_SANDY_BEACH],
  ["saudi-prince", MAP_SAUDI_PRINCE],
  ["shaker", MAP_SHAKER],
  // ["short-fenway", MAP_SHORT_FENWAY],
  ["short-glam", MAP_SHORT_GLAM],
  // ["short-res-to-bu-bridge", MAP_SHORT_RES_TO_BU_BRIDGE],
  ["short-res", MAP_SHORT_RES],
  ["short-sb", MAP_SHORT_SB],
  ["skeleton-overlook", MAP_SKELETON_OVERLOOK],
  ["smoots", MAP_SMOOTS],
  ["son-of-a-beach", MAP_SON_OF_A_BEACH],
  ["south-border-road", MAP_SOUTH_BORDER_ROAD],
  ["south-of-the-border", MAP_SOUTH_OF_THE_BORDER],
  ["spy-pond", MAP_SPY_POND],
  ["squares", MAP_SQUARES],
  ["swimming-hole", MAP_SWIMMING_HOLE],
  ["sy-snootles", MAP_SY_SNOOTLES],
  ["taylors-stupid-run", MAP_TAYLORS_STUPID_RUN],
  ["the-highlands", MAP_THE_HIGHLANDS],
  ["tour-de-cambrville-bricks", MAP_TOUR_DE_CAMBRVILLE_BRICKS],
  ["tour-de-malden", MAP_TOUR_DE_MALDEN],
  ["townie-porn", MAP_TOWNIE_PORN],
  // ["triple-peaks", MAP_TRIPLE_PEAKS],
  ["trunks", MAP_TRUNKS],
  // ["twin-peaks", MAP_TWIN_PEAKS],
  ["two-bridges", MAP_TWO_BRIDGES],
  ["viking-tower", MAP_VIKING_TOWER],
  ["west-cambridge", MAP_WEST_CAMBRIDGE],
  ["west-lakes", MAP_WEST_LAKES],
  ["west-med", MAP_WEST_MED],
  ["wilson-farm", MAP_WILSON_FARM],
  // ["winchester-hospital", MAP_WINCHESTER_HOSPITAL],
  ["woodbine-wiggle", MAP_WOODBINE_WIGGLE],
  ["x-c-loop", MAP_X_C_LOOP],
  ["x-no-hill", MAP_X_NO_HILL],
  // ["yerxa", MAP_YERXA],
  ["zero-fells", MAP_ZERO_FELLS],
]);
