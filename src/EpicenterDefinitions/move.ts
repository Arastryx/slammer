import { SlamElementDefinition } from "../Slammer/SlamXML/slam";

const boundingShapesDef: SlamElementDefinition = {
  name: "BoundingShapes",
  type: "listing",
  required: true,
  elements: [
    {
      name: "BoundingBox3D",
      attributes: [
        { name: "minX", type: "number" },
        { name: "minY", type: "number" },
        { name: "minZ", type: "number" },
        { name: "maxX", type: "number" },
        { name: "maxY", type: "number" },
        { name: "maxZ", type: "number" },
      ],
    },
  ],
};

export const moveDefinition: SlamElementDefinition = {
  name: "Move",
  elements: [
    { name: "Conditions" },
    { name: "Cancels" },
    { name: "OnEnter" },
    { name: "Actions" },
    {
      name: "Frames",
      type: "listing",
      elements: [
        {
          name: "Frame",
          attributes: [{ name: "ticks", type: "number" }],
          elements: [
            {
              name: "BoundingSets",
              type: "listing",
              elements: [
                { name: "HurtboxSet", elements: [boundingShapesDef] },
                {
                  name: "HitboxSet",
                  attributes: [
                    { name: "damage", type: "number" },
                    { name: "hitStun", type: "number" },
                    { name: "hitFreeze", type: "number" },
                    { name: "reset", type: "boolean" },
                    { name: "maxHits", type: "number" },
                    { name: "hitInterval", type: "number" },
                  ],
                  elements: [{ name: "ReactionMotion" }, boundingShapesDef],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
