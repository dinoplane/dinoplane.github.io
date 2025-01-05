+++
image = "featured.png"
title = "60 Second Alchemist"
date = "2023-03-24T00:00:00Z"
type = "gallery"
+++
summary: With a group of 9 game design students, we developed a prototype of a 3D platformer in Unity. Play as Hazel who must harvest ingredients and brew potions for customers to make a living.
tags:
  - Game

# Optional external URL for project (replaces project detail page).
# external_link: https://geminiduality.itch.io/60-second-alchemist



image:
  caption: You only have 60 seconds to harvest...
  focal_point: Smart



Link to the project here! https://geminiduality.itch.io/60-second-alchemist



*Note: I am writing this so I can recap what I did on this project. Take this as a sort of post-mortem perhaps.*

STILL UNDER CONSTRUCTION! But read on.

60 Second Alchemist is a crafting 3D platformer where players collect ingredients and craft potions to sell to customers. Play as Hazel, an apprentice witch, who must deal with the arduious task of growing up and making money to pay off her never-ending cost of living. Receive potion orders from customers, strategize what ingredients to collect, and make the purest potion imaginable to maximize your profit!


**My contributions**

In the beginning of this project, I began on making the base of the 3D world exploration. That is... the basic third person player controller that could collide with objects and destroy objects with a weapon.



The next thing I worked on was the upgradable stats for the player (giving the player the ability to upgrade their jump) and the compass/landmark feature so the player could detect where the essential ingredients were.


The final objective was related the 3D world again, a spring arm camera and a projection of the map on the exploration screen (which was essentially a picture taken from a camera, projected onto an image object, which was used as the material of a ui element). The scaling from the world to the map made making the landmarks (the markers on the map) especially hard to manipulate (there was a weird issue where the icons were offset a bit, and it was puzzling because the relative locations of the origins of each domain space were different).


