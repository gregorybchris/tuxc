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

export const MAPS: RunMap[] = [
  { id: 1, ...MAP_MYSTIC_STOPLIGHT_COOLDOWN },
  { id: 2, ...MAP_BATTLE_ROAD },
  { id: 3, ...MAP_HB },
  { id: 4, ...MAP_MAIN_STREET },
  { id: 5, ...MAP_FULL_GLAM },
  { id: 6, ...MAP_GEORGE_STREET },
  { id: 7, ...MAP_MED_SQUARE },
  { id: 8, ...MAP_EXTENDEDLY_SHORT_GLAM },
  { id: 9, ...MAP_HARVARD },
  { id: 10, ...MAP_SHORT_GLAM },
  { id: 11, ...MAP_WOODBINE_WIGGLE },
  { id: 12, ...MAP_CHRIS_DADS_HOUSE },
  { id: 13, ...MAP_EXTENDEDLY_SHORTER_GLAM },
  { id: 14, ...MAP_C_LOOP },
  { id: 15, ...MAP_PORTER },
  { id: 16, ...MAP_NO_FELLS },
  { id: 17, ...MAP_OG_NO_FELLS },
  { id: 18, ...MAP_VIKING_TOWER },
  // {id: 19, ...MAP_YERXA},
  { id: 20, ...MAP_LAKES },
  { id: 21, ...MAP_NO_RES },
  { id: 22, ...MAP_SHORT_RES },
  { id: 23, ...MAP_CHIPS },
  { id: 24, ...MAP_CEMETERY },
  { id: 25, ...MAP_09_RED_LINE },
  { id: 26, ...MAP_CASTLE_BLACK },
  { id: 27, ...MAP_EXTENDED_CEMETERY },
  { id: 28, ...MAP_EXTENDED_HARVARD },
  { id: 29, ...MAP_MALDEN },
  { id: 30, ...MAP_SPY_POND },
  { id: 31, ...MAP_ONE_BRIDGE },
  { id: 32, ...MAP_FRESH_POND },
  { id: 33, ...MAP_MID_RES },
  { id: 34, ...MAP_TWO_BRIDGES },
  { id: 35, ...MAP_SWIMMING_HOLE },
  // {id: 36, ...MAP_MID_D_MADNESS},
  { id: 37, ...MAP_LONG_RES },
  { id: 38, ...MAP_BELMONT },
  { id: 39, ...MAP_S_BIASED },
  { id: 40, ...MAP_FIREHOUSE },
  // {id: 41, ...MAP_1500_METER_POND_SHORT},
  { id: 42, ...MAP_BU_BRIDGE_FAKE_10 },
  { id: 43, ...MAP_1500_METER_POND },
  { id: 44, ...MAP_AROUND_THE_FELLS },
  { id: 45, ...MAP_HOOVER_SUCKS },
  { id: 46, ...MAP_BELMONT_HILL },
  { id: 47, ...MAP_TOUR_DE_MALDEN },
  { id: 48, ...MAP_LONGFELLOW },
  { id: 49, ...MAP_ENFORCER },
  { id: 50, ...MAP_POWDER_TEELE },
  { id: 51, ...MAP_NORTH_STREET },
  { id: 52, ...MAP_DO_IT_LIVE },
  { id: 53, ...MAP_GLAMOURVILLE },
  { id: 54, ...MAP_WEST_MED },
  { id: 55, ...MAP_X_C_LOOP },
  { id: 56, ...MAP_TAYLORS_STUPID_RUN },
  { id: 57, ...MAP_FRIES },
  // {id: 58, ...MAP_GHETTO_RUN},
  { id: 59, ...MAP_NEAR_TOWER },
  { id: 60, ...MAP_SOUTH_OF_THE_BORDER },
  { id: 61, ...MAP_WEST_LAKES },
  { id: 62, ...MAP_ALEWIFE_GREENWAY },
  { id: 63, ...MAP_MARVELS_D },
  { id: 64, ...MAP_TOWNIE_PORN },
  { id: 65, ...MAP_BROOKS_ESTATE },
  { id: 66, ...MAP_MOMS_RUN },
  { id: 67, ...MAP_RAILROAD_UNDERPASS },
  { id: 68, ...MAP_FUMRD },
  { id: 69, ...MAP_SAUDI_PRINCE },
  { id: 70, ...MAP_ASS_CANYON },
  { id: 71, ...MAP_EXTENDED_CHIPS },
  { id: 72, ...MAP_RECTANGLE },
  { id: 73, ...MAP_TRUNKS },
  { id: 74, ...MAP_6_MILE_BIKE_PATH },
  { id: 75, ...MAP_FELLSWAY },
  { id: 76, ...MAP_ARLINGTON_TO_ALEWIFE },
  { id: 77, ...MAP_SQUARES },
  { id: 78, ...MAP_SHORT_SB },
  { id: 79, ...MAP_BRATTLE_STREET },
  { id: 80, ...MAP_K_HARVARD },
  { id: 81, ...MAP_BOAT_HOUSE },
  { id: 82, ...MAP_SOUTH_BORDER_ROAD },
  { id: 83, ...MAP_BROADWASH },
  { id: 84, ...MAP_WEST_CAMBRIDGE },
  // {id: 85, ...MAP_FELLS_N_CHIPS},
  // {id: 86, ...MAP_DEA_POND},
  { id: 87, ...MAP_FEMMED },
  { id: 88, ...MAP_GOLDMAN_SACHS },
  { id: 89, ...MAP_TOUR_DE_CAMBRVILLE_BRICKS },
  { id: 90, ...MAP_BUNKER_HILL },
  { id: 91, ...MAP_FEMETERY },
  // {id: 92, ...MAP_SANDY_BEACH},
  { id: 93, ...MAP_OGSB },
  // {id: 94, ...MAP_MARATHON_MONDAY},
  { id: 95, ...MAP_NEW_BUNKER_HILL },
  // {id: 96, ...MAP_MENOTOMY},
  // {id: 97, ...MAP_BIKE_LAKES},
  // {id: 98, ...MAP_DONUT_RUN_DELUXE},
  // {id: 99, ...MAP_2_CENTRAL},
  { id: 100, ...MAP_GOOCH_PLAYGROUND },
  { id: 101, ...MAP_LONG_LAKES },
  { id: 102, ...MAP_ENCORE },
  { id: 103, ...MAP_LONG_RES_TO_WINCHESTER_HOSPITAL },
  // {id: 104, ...MAP_DOUBLE_MID_RES},
  // {id: 105, ...MAP_WINCHESTER_HOSPITAL},
  // {id: 106, ...MAP_CHARLES_NINE_MILER},
  { id: 107, ...MAP_FAR_TOWER },
  { id: 108, ...MAP_FAR_TOWER_TO_FIREHOUSE },
  { id: 109, ...MAP_PISGAH },
  { id: 110, ...MAP_BBB },
  { id: 111, ...MAP_96_STRAIGHT_STREET },
  // {id: 112, ...MAP_LONG_RES_TO_LONG_LAKES},
  { id: 113, ...MAP_GC },
  { id: 114, ...MAP_RUBI_FACTORY },
  { id: 115, ...MAP_MENOTOMY_TO_BELMONT },
  { id: 116, ...MAP_NO_HILL },
  { id: 117, ...MAP_PRESIDENTS_RUN },
  { id: 118, ...MAP_SY_SNOOTLES },
  // {id: 119, ...MAP_NO_WHIP},
  { id: 120, ...MAP_SMOOTS },
  { id: 121, ...MAP_BERNIES_GREAT_MEADOW },
  // {id: 122, ...MAP_EXTRA_SHORT_FREEDOM_TRAIL},
  { id: 123, ...MAP_GOLDILOCKS },
  // {id: 124, ...MAP_PURPLE_PEOPLE_EATER},
  // {id: 125, ...MAP_SHORT_FENWAY},
  { id: 126, ...MAP_HABITAT },
  { id: 127, ...MAP_LOGAN_FERRY },
  // {id: 128, ...MAP_FREEDOM_TRAIL_SHORT},
  { id: 129, ...MAP_X_NO_HILL },
  { id: 130, ...MAP_FREEDOM_TRAIL },
  { id: 131, ...MAP_MET_STATE },
  { id: 132, ...MAP_WILSON_FARM },
  // {id: 133, ...MAP_CHARLES_ST},
  { id: 134, ...MAP_SHAKER },
  { id: 135, ...MAP_HORN_POND },
  { id: 136, ...MAP_FENWAY },
  { id: 137, ...MAP_SKELETON_OVERLOOK },
  { id: 138, ...MAP_OG_NO_HILL },
  { id: 139, ...MAP_ZERO_FELLS },
  { id: 140, ...MAP_GREENWAY },
  { id: 141, ...MAP_AQUARIUM },
  // {id: 142, ...MAP_TWIN_PEAKS},
  // {id: 143, ...MAP_BOSTON_MASSACRE},
  // {id: 144, ...MAP_MUSEUM_OF_SCIENCE},
  { id: 145, ...MAP_SON_OF_A_BEACH },
  // {id: 146, ...MAP_BC_RES},
  { id: 147, ...MAP_JP },
  // {id: 148, ...MAP_BOSTON_TOUR},
  // {id: 149, ...MAP_TRIPLE_PEAKS},
  // {id: 150, ...MAP_FEMEPOND_CHARLES_BFL},
  // {id: 151, ...MAP_SHORT_RES_TO_BU_BRIDGE},
  { id: 152, ...MAP_THE_HIGHLANDS },
  // {id: 153, ...MAP_FREEDOM_TRAIL_EXTENDED},
  { id: 154, ...MAP_ARBORETUM_X_JP },
  // {id: 155, ...MAP_BFL},
  // {id: 156, ...MAP_EX_BFL},
];
