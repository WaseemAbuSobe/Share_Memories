import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const  getPosts = async (req,res) => {
    try{
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch(error) { res.status(404).json({message:error.message}) }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) { res.status(409).json({message:error}) }
}

export const updatePost = async (req,res) => {
    const { id } = req.params;
    const {title, message , creator ,selectedFile , tags} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        const update = {title, message , creator ,selectedFile , tags};
        await PostMessage.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json(update);
    } catch (error) { res.status(409).json({message:error}) }

}

export const  deletePost = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        await PostMessage.findOneAndDelete({ _id: id });
        res.json({ message: "Post deleted successfully." });
    } catch (error) { res.status(409).json({message:error}) }
}

export const likePost = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        res.json(updatedPost);
    } catch (error) { res.status(409).json({message:error}) }
}