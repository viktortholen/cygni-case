import { Request, Response } from 'express';
const axios = require('axios');

export const info = async (req: Request, res: Response) => {
    const mbid = req.query.mbid;
    if(mbid == undefined)
        return res.status(400).send({error: `No mbid was not provided as a parameter. Please provide a valid mdib.`});
    
    try{
        const mbData = await getMusicBrainzData(mbid);
        const wikiTitle = await getWikiTitle(mbData);
        const wikiDesc = await getWikipediaDesc(wikiTitle);
        //Formatting
        const albums : object = mbData['release-groups'].map((a : any) => {
            return {
                title : a.title,
                id : a. id,
                image : coverArt(a.id)
            };
        });

        return res.status(200).send({
            mbid,
            description: wikiDesc,
            albums,
        });
    }catch(err)
    {
        return res.status(404).send({error : `The mbid was invalid or did not match any results.`});
    }

};


const getMusicBrainzData = async(mbid : any) => {
    const inc = "?&inc=url-rels+release-groups&type=album";
    const url = process.env.MUSICBRAINZ_URL + 'artist/' + mbid + inc;
    console.log(url)
    return await axios.get(url)
        .then((res: any) => {
            return res.data;
        });
}
const getWikiTitle = async(res : any) => {

    const wiki_url = res.relations.filter((d : any)=>{
        return d.type==="wikidata";
    })[0]?.url?.resource;
    
    const id = wiki_url.substring(wiki_url.lastIndexOf('/') + 1);
    const options = "&format=json&props=sitelinks";
    const url = `${process.env.WIKI_URL}?action=wbgetentities&ids=${id}${options}`;
    return await axios.get(url)
        .then((res: any) => {
            let title = res.data.entities[id].sitelinks.enwiki.title;
            return title.replace(' ', '_');
        });
}
const getWikipediaDesc = async(title : string) => {

    const options = `&format=json&prop=extracts&exintro=true&redirects=true&titles=${title}`;
    const url = `${process.env.WIKIPEDIA_URL}?action=query${options}`;
    return await axios.get(url)
        .then((res: any) => {
            let pages = res.data.query.pages;
            return pages[Object.keys(pages)[0]].extract;
        });
}
const coverArt = (mbid : any) => {
    return `${process.env.COVER_ART_ARCHIVE_URL}/release-group/${mbid}/front`;
}