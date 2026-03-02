import supabase from '../../db/supabase.js';


const getPosts = async (req, res) => {
    try {
        const response = await supabase
            .from('oglasi')
            .select('*')
            .order("id");

        console.log("FULL RESPONSE:", response);

        const { data: oglasi, error } = response;

        if (error) {
            console.log("SUPABASE ERROR:", error);
            return res.status(500).send(error.message);
        }

        res.render('list-posts', { oglasi });

    } catch (err) {
        console.error("CATCH ERROR:", err);
        res.status(500).send('Failed to fetch oglasi');
    }
}


const getPostById = async (req, res) =>{
    const { id } = req.params;

    const { data, error } = await supabase
        .from('oglasi')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.log(error);
        return res.status(404).send("Post not found");
    }

    res.render('edit-post', { post: data });
}

const deletePost = async (req, res) =>{
    const { id } = req.params;
    console.log(id);

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const { data, error } = await supabase
        .from('oglasi')
        .delete()
        .match({ id: id })
        .select();

    if (error) {
        return res.status(500).json({ message: "Database error" })
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ message: "Post not found" });
    }

    return res.status(204).send();
}

const createPost = async (req, res) =>{
    const { kategorija_oglasa, tekst_oglasa, cena, valuta, datum_isteka, tags, privatni_email, poslovni_email } = req.body
    let formatedTags;

    if (tags) {
        formatedTags = tags.split(',').filter(tag => tag != '').map(tag => tag.trim());
    }

    const { data, error } = await supabase
        .from('oglasi')
        .insert({
            kategorija_oglasa: kategorija_oglasa,
            tekst_oglasa: tekst_oglasa,
            cena: cena,
            valuta: valuta,
            datum_isteka: datum_isteka,
            tags: tags,
            emails: [
                { tip: 'privatni', email: privatni_email },
                { tip: 'poslovni', email: poslovni_email }
            ]
        });

    if (error) {
        return res.status(401).json({ message: "Problem with adding post" + error.message })
    }

    return res.json(data);
}

const updatePost = async (req, res) =>{
    const { id } = req.params;
    const {
        kategorija_oglasa,
        tekst_oglasa,
        cena,
        valuta,
        datum_isteka,
        tags,
        privatni_email,
        poslovni_email
    } = req.body;

    const updatedData = {
        kategorija_oglasa,
        tekst_oglasa,
        cena: parseInt(cena),
        valuta,
        datum_isteka,
        tags: tags,
        emails: [
            { tip: 'privatni', email: privatni_email },
            { tip: 'poslovni', email: poslovni_email }
        ]
    };

    const { error } = await supabase
        .from('oglasi')
        .update(updatedData)
        .eq('id', id);

    if (error) {
        console.log(error);
        return res.status(400).send("Update failed");
    }

    res.redirect('/');
}

export {
    getPosts,
    getPostById,
    deletePost,
    createPost,
    updatePost
}