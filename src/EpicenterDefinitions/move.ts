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
  attributes: [
    {
      name: "syncOnCancel",
      type: "boolean",
    },
  ],
  elements: [
    {
      name: "Conditions",
      attributes: [],
      elements: [
        {
          name: "DirectionalInput",
          attributes: [],
          elements: [],
        },
      ],
    },
    {
      name: "Cancels",
      attributes: [],
      elements: [
        {
          name: "If",
          attributes: [
            {
              name: "cond",
              type: "string",
            },
          ],
          elements: [
            {
              name: "True",
              attributes: [],
              elements: [
                {
                  name: "Move",
                  attributes: [
                    {
                      name: "name",
                      type: "string",
                    },
                  ],
                  elements: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "OnEnter",
      attributes: [],
      elements: [
        {
          name: "If",
          attributes: [
            {
              name: "cond",
              type: "string",
            },
            {
              name: "input",
              type: "string",
            },
          ],
          elements: [
            {
              name: "True",
              attributes: [],
              elements: [
                {
                  name: "PlayManeuver",
                  attributes: [
                    {
                      name: "name",
                      type: "string",
                    },
                  ],
                  elements: [],
                },
              ],
            },
          ],
        },
        {
          name: "If",
          attributes: [
            {
              name: "cond",
              type: "string",
            },
            {
              name: "input",
              type: "string",
            },
          ],
          elements: [
            {
              name: "True",
              attributes: [],
              elements: [
                {
                  name: "PlayManeuver",
                  attributes: [
                    {
                      name: "name",
                      type: "string",
                    },
                  ],
                  elements: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Actions",
      attributes: [],
      elements: [
        {
          name: "Gravity",
          attributes: [
            {
              name: "gravity",
              type: "string",
            },
          ],
          elements: [],
        },
        {
          name: "If",
          attributes: [
            {
              name: "cond",
              type: "string",
            },
            {
              name: "input",
              type: "string",
            },
          ],
          elements: [
            {
              name: "True",
              attributes: [],
              elements: [
                {
                  name: "PlayManeuver",
                  attributes: [
                    {
                      name: "name",
                      type: "string",
                    },
                  ],
                  elements: [],
                },
              ],
            },
          ],
        },
        {
          name: "If",
          attributes: [
            {
              name: "cond",
              type: "string",
            },
            {
              name: "input",
              type: "string",
            },
          ],
          elements: [
            {
              name: "True",
              attributes: [],
              elements: [
                {
                  name: "PlayManeuver",
                  attributes: [
                    {
                      name: "name",
                      type: "string",
                    },
                  ],
                  elements: [],
                },
              ],
            },
          ],
        },
        {
          name: "If",
          attributes: [
            {
              name: "cond",
              type: "string",
            },
            {
              name: "input",
              type: "string",
            },
          ],
          elements: [
            {
              name: "True",
              attributes: [],
              elements: [
                {
                  name: "SetFlag",
                  attributes: [
                    {
                      name: "flag",
                      type: "string",
                    },
                    {
                      name: "value",
                      type: "boolean",
                    },
                  ],
                  elements: [],
                },
                {
                  name: "Orbit",
                  attributes: [
                    {
                      name: "target",
                      type: "string",
                    },
                    {
                      name: "radius",
                      type: "number",
                    },
                    {
                      name: "speed",
                      type: "string",
                    },
                    {
                      name: "accel",
                      type: "string",
                    },
                    {
                      name: "goRight",
                      type: "boolean",
                    },
                  ],
                  elements: [],
                },
              ],
            },
          ],
        },
        {
          name: "If",
          attributes: [
            {
              name: "cond",
              type: "string",
            },
            {
              name: "input",
              type: "string",
            },
          ],
          elements: [
            {
              name: "True",
              attributes: [],
              elements: [
                {
                  name: "SetFlag",
                  attributes: [
                    {
                      name: "flag",
                      type: "string",
                    },
                    {
                      name: "value",
                      type: "boolean",
                    },
                  ],
                  elements: [],
                },
                {
                  name: "Orbit",
                  attributes: [
                    {
                      name: "target",
                      type: "string",
                    },
                    {
                      name: "radius",
                      type: "number",
                    },
                    {
                      name: "speed",
                      type: "string",
                    },
                    {
                      name: "accel",
                      type: "string",
                    },
                    {
                      name: "goRight",
                      type: "boolean",
                    },
                  ],
                  elements: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Frames",
      attributes: [],
      elements: [
        {
          name: "Frame",
          attributes: [],
          elements: [
            {
              name: "BoundingSets",
              attributes: [],
              elements: [
                {
                  name: "HurtboxSet",
                  attributes: [],
                  elements: [
                    {
                      name: "BoundingShapes",
                      attributes: [],
                      elements: [
                        {
                          name: "BoundingBox3D",
                          attributes: [
                            {
                              name: "minX",
                              type: "number",
                            },
                            {
                              name: "minY",
                              type: "number",
                            },
                            {
                              name: "minZ",
                              type: "number",
                            },
                            {
                              name: "maxX",
                              type: "number",
                            },
                            {
                              name: "maxY",
                              type: "number",
                            },
                            {
                              name: "maxZ",
                              type: "number",
                            },
                          ],
                          elements: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
