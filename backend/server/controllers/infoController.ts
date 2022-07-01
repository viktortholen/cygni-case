import { Request, Response } from 'express';
const axios = require('axios');

export const info = async (req: Request, res: Response) => {
//get the MBID

//send the request to musicbrainz
const music_res = await musicbrainz();
//send request to WIKI
const wiki_res = await wikidata(music_res);
//send request to Cover art


/*
● En beskrivning av artisten som hämtas från Wikipedia. Wikipedia innehåller
inte några MBID utan mappningen mellan MBID och Wikipedia-identifierare
finns via MusicBrainz API (antingen en direktreferens eller via språkproxyn
Wikidata).
● En lista över alla album som artisten släppt och länkar till bilder för varje
album. Listan över album finns i MusicBrainz men bilderna finns på Cover Art
Archive.

*/

  return res.status(200).send({
    status: true,
    wiki_res,
  });
};


const musicbrainz = async() => {
  
    const exampleMDIB = "5b11f4ce-a62d-471e-81fc-a69a8278c7da";
    const inc = "?&inc=url-rels+release-groups&type=album";
    const url = process.env.MUSICBRAINZ_URL + 'artist/' + exampleMDIB + inc;
    console.log(url)
    return await axios.get(url)
        .then((res: any) => {
            return res.data;
        });
    ///artist/<MBID>?inc=<INC>
}
const wikidata = async(res : any) => {
    const wiki_url = res.relations.filter((d : any)=>{
        return d.type==="wikidata";
    })[0]?.url?.resource;

    const id = wiki_url.substring(wiki_url.lastIndexOf('/') + 1);
    const options = "&format=json&props=sitelinks";
    const url = process.env.WIKI_URL + '?action=wbgetentities' + "&ids=" + id + options;

    return await axios.get(url)
        .then((res: any) => {
            console.log(res.data.entities[id].sitelinks)
            return res.data.entities[id].sitelinks;
        });
}