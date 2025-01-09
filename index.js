require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`✅ ${client.user.username}#${client.user.discriminator} is online.`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!ping")) {
    await message.reply("pong!");
  }

  if (message.content.startsWith("!catfact")) {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      const fact = response.data.fact;
      const catGifUrl = `https://pbs.twimg.com/media/EuiZYkrXMAIIAsB.jpg`;
      const embed = new EmbedBuilder()
        .setTitle(`${fact}`)
        .setColor(0xff5733)
        .setImage(catGifUrl);
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      await message.channel.send("code red: could not fetch fact");
    }
  }




  if (message.content.startsWith("!kitty")) {
    try {
      const catGifUrl = `https://cataas.com/cat?type=square&${Date.now()}`;
      const embed = new EmbedBuilder()
        .setTitle("Random cat picture of the day!")
        .setColor(0xff5733)
        .setImage(catGifUrl);
      await message.channel.send({ embeds: [embed] });
    } catch (error) { 
      await message.channel.send("code red: couldnt fetch fact");
    }
  }

  if (message.content.startsWith("!spawn NIGGA")) {
    try {
      const imageArr = ['https://t3.ftcdn.net/jpg/02/76/20/92/360_F_276209263_e8ILp09w4YV4bVfVzECiJAStwoY8O8Ot.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Qs8urmoVFkuFPHwnOWtkInn1MP8GJ8dVjQ&s', 'https://media.tenor.com/vdB5AsC-0s4AAAAe/big-black-men.png', 'https://imgcdn.stablediffusionweb.com/2024/8/28/4148f265-4e6f-40e5-ade3-c14730519ff8.jpg', 'https://steamuserimages-a.akamaihd.net/ugc/2041854894659384966/877CA8D1BF9BD6E7C1975AED1E8BD6492C628A96/', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfONigMzIDpMOz1HlkBREIuYho0TsyqdAyw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_XZWbf0LoYCajE3QFlWEAaGvXiqWljkJ1ug&s']
      const imageUrl = imageArr[Math.floor(Math.random() * imageArr.length)]
      const embed = new EmbedBuilder()
      .setTitle("here's your image")
      .setColor(0x00ff00)
      .setImage(imageUrl);
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      await message.channel.send("no buff oiled up NIGGA for you, unfortunately");
    }
  }

});



module.exports = app;

client.login(TOKEN);
