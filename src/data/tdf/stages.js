import { stage1 } from "../tdf/stage1"
import { stage2 } from "../tdf/stage2"
import { stage3 } from "../tdf/stage3"
import { stage4 } from "../tdf/stage4"
import { stage5 } from "../tdf/stage5"
import { stage6 } from "../tdf/stage6"
import { stage7 } from "../tdf/stage7"
import { stage8 } from "../tdf/stage8"
import { stage9 } from "../tdf/stage9"
import { stage10 } from "../tdf/stage10"
import { stage11 } from "../tdf/stage11"
import { stage12 } from "../tdf/stage12"
import { stage13 } from "../tdf/stage13"
import { stage14 } from "../tdf/stage14"
import { stage15 } from "../tdf/stage15"
import { stage16 } from "../tdf/stage16"
import { stage17 } from "../tdf/stage17"
import { stage18 } from "../tdf/stage18"
import { stage19 } from "../tdf/stage19"
import { stage20 } from "../tdf/stage20"
import { stage21 } from "../tdf/stage21"

export const stages = [stage1,stage2,stage3,stage4,stage5,stage6,stage7,stage8,stage9,stage10,stage11,stage12,stage13,stage14,stage15,stage16,stage17,stage18,stage19,stage20,stage21]
export const highlights = [
    // Stage 1
    [{"start": 261, "distance": 332, type: "3", name: "Côte de Laukiz"},
    {"start": 2013, "distance": 2086, type: "3", name: "Côte de San Juan de Gaztelugatxe"},
    {"start": 0, "distance": 2559, type: "S", name: "Gernika-Lumo"},
    {"start": 3928, "distance": 4025, type: "4", name: "Col de Morga"},
        {"start": 4262, "distance": 4432, type: "2", name: "Côte de Vivero"},
        {"start": 4819, "distance": 4901, type: "3", name: "Côte de Pike"}],
    // Stage 2
    [{"start": 0, "distance": 589, type: "S", name: "Legutio"},
        {"start": 1725, "distance": 2039, type: "3", name: "Col d'Udana"},
        {"start": 2131, "distance": 2227, type: "4", name: "Côte d'Aztiria"},
        {"start": 3862, "distance": 4045, type: "3", name: "Côte d'Alkiza"},
        {"start": 4987, "distance": 5067, type: "4", name: "Côte de Gurutze"},
        {"start": 5431, "distance": 5743, type: "2", name: "Jaizkibel", bonus: true}
    ],
    [
        {"start": 272, "distance": 337, type: "3", name: "Côte de Trabakua"},
        {"start": 710, "distance": 790, type: "4", name: "Côte de Milloi"},
        {"start": 0, "distance": 1867, type: "S", name: "Deba"},
        {"start": 1895, "distance": 2048, type: "3", name: "Col d'Itziar"},
        {"start": 2836, "distance": 3034, type: "3", name: "Côte d'Orioko Benta"}
    ],
]